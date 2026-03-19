#!/usr/bin/env deno run --allow-env --allow-net --allow-read --allow-ffi
// Based on https://github.com/quiint/c7 (MIT License)

import { Console, Effect, Schema } from "jsr:@totto2727/fp@3.0/effect";
import { Args, Command, Options } from "jsr:@totto2727/fp@3.0/effect/cli";
import {
  FetchHttpClient,
  HttpClient,
  HttpClientRequest,
  HttpClientResponse,
} from "jsr:@totto2727/fp@3.0/effect/platform";
import { NodeContext, NodeRuntime } from "jsr:@totto2727/fp@3.0/effect/platform/node";
import { Markdown, type MarkdownTheme } from "npm:@mariozechner/pi-tui@0.52";
import chalk from "npm:chalk@5.6";
import ora from "npm:ora@8.2";
import * as process from "node:process";

const mdTheme: MarkdownTheme = {
  heading: (t) => chalk.bold.cyan(t),
  link: (t) => chalk.underline.blue(t),
  linkUrl: (t) => chalk.dim(t),
  code: (t) => chalk.yellow(t),
  codeBlock: (t) => chalk.green(t),
  codeBlockBorder: (t) => chalk.dim(t),
  quote: (t) => chalk.italic.gray(t),
  quoteBorder: (t) => chalk.gray(t),
  hr: (t) => chalk.dim(t),
  listBullet: (t) => chalk.cyan(t),
  bold: (t) => chalk.bold(t),
  italic: (t) => chalk.italic(t),
  strikethrough: (t) => chalk.strikethrough(t),
  underline: (t) => chalk.underline(t),
};

const withSpinner = <A, E, R>(message: string, effect: Effect.Effect<A, E, R>) =>
  Effect.acquireUseRelease(
    Effect.sync(() => ora(message).start()),
    () => effect,
    (spinner) => Effect.sync(() => spinner.stop()),
  );

const API_BASE_URL = "https://context7.com";
const SEARCH_API_URL = `${API_BASE_URL}/api/v2/libs/search`;
const CONTEXT_API_URL = `${API_BASE_URL}/api/v2/context`;

const SearchResult = Schema.Struct({
  id: Schema.String,
  title: Schema.optionalWith(Schema.String, { default: () => "N/A" }),
  description: Schema.optional(Schema.String),
  trustScore: Schema.optional(Schema.Number),
  totalSnippets: Schema.optional(Schema.Number),
});

const SearchResponse = Schema.Struct({
  results: Schema.Array(SearchResult),
});

const makeRequest = (url: string) =>
  Effect.sync(() => {
    const apiKey = process.env["CONTEXT7_API_KEY"];
    const req = HttpClientRequest.get(url);
    return apiKey ? req.pipe(HttpClientRequest.bearerToken(apiKey)) : req;
  });

const handleSearch = (libraryName: string, query: string) =>
  Effect.gen(function* () {
    const client = (yield* HttpClient.HttpClient).pipe(HttpClient.filterStatusOk);
    const parsed = yield* withSpinner(
      `Searching for "${libraryName}"...`,
      Effect.gen(function* () {
        const params = new URLSearchParams({ query, libraryName });
        const req = yield* makeRequest(`${SEARCH_API_URL}?${params}`);
        const response = yield* client.execute(req);
        return yield* HttpClientResponse.schemaBodyJson(SearchResponse)(response);
      }),
    );
    const libraries = parsed.results;
    if (libraries.length === 0) {
      yield* Console.log(`No libraries found matching "${libraryName}".`);
      return;
    }
    yield* Console.log(`Found ${libraries.length} matching library(ies):`);
    yield* Console.log(`\n--- Search Results (Use "Library ID" for queries) ---`);
    for (const lib of libraries) {
      const desc = lib.description ? ` - ${lib.description}` : "";
      const trust = lib.trustScore ? ` [Trust: ${lib.trustScore}]` : "";
      yield* Console.log(`  - ${lib.title} (ID: ${lib.id})${desc}${trust}`);
    }
    yield* Console.log(`-----------------------------------------------------\n`);
    yield* Console.log(`Example query: c7 context ${libraries[0].id} <your query>`);
  }).pipe(
    Effect.catchTag("ResponseError", (e) =>
      Effect.gen(function* () {
        const body = yield* e.response.text.pipe(Effect.catchAll(() => Effect.succeed("")));
        yield* Console.error(`Search failed: ${e.response.status} ${e.message}`);
        if (body) yield* Console.error(`Details: ${body}`);
        yield* Effect.fail(e);
      }),
    ),
    Effect.catchTag("ParseError", (e) =>
      Effect.gen(function* () {
        yield* Console.error(`Failed to parse search response: ${e.message}`);
        yield* Effect.fail(e);
      }),
    ),
  );

const handleQuery = (libraryId: string, query: string, type: string) =>
  Effect.gen(function* () {
    const client = (yield* HttpClient.HttpClient).pipe(HttpClient.filterStatusOk);
    const apiType = type === "md" ? "txt" : type;
    const response = yield* withSpinner(
      "Fetching context...",
      Effect.gen(function* () {
        const params = new URLSearchParams({ query, libraryId, type: apiType });
        const req = yield* makeRequest(`${CONTEXT_API_URL}?${params}`);
        return yield* client.execute(req);
      }),
    );
    if (type === "json") {
      const data = yield* response.json;
      yield* Console.log(`--- Query Result (JSON) ---`);
      yield* Console.log(JSON.stringify(data, null, 2));
    } else if (type === "md") {
      const data = yield* response.text;
      const md = new Markdown(data, 1, 0, mdTheme);
      const lines = md.render(process.stdout.columns || 80);
      yield* Console.log(lines.join("\n"));
    } else {
      const data = yield* response.text;
      yield* Console.log(`--- Query Result (TXT) ---`);
      yield* Console.log(data);
    }
  }).pipe(
    Effect.catchTag("ResponseError", (e) =>
      Effect.gen(function* () {
        const body = yield* e.response.text.pipe(Effect.catchAll(() => Effect.succeed("")));
        yield* Console.error(`Context query failed: ${e.response.status} ${e.message}`);
        if (body) yield* Console.error(`Details: ${body}`);
        yield* Effect.fail(e);
      }),
    ),
  );

const libraryName = Args.text({ name: "libraryName" });
const libraryId = Args.text({ name: "libraryId" });
const query = Args.text({ name: "query" }).pipe(Args.repeated);
const outputType = Options.choice("type", ["txt", "json", "md"]).pipe(
  Options.withAlias("t"),
  Options.withDefault("txt"),
);

const search = Command.make("search", { libraryName, query }, ({ libraryName, query }) =>
  handleSearch(libraryName, Array.from(query).join(" ")),
);

const context = Command.make(
  "context",
  { libraryId, query, type: outputType },
  ({ libraryId, query, type }) => handleQuery(libraryId, Array.from(query).join(" "), type),
);

const root = Command.make("c7", {}).pipe(Command.withSubcommands([search, context]));

const cli = Command.run(root, {
  name: "Context7 CLI",
  version: "1.0.0",
});

cli(process.argv).pipe(
  Effect.provide(NodeContext.layer),
  Effect.provide(FetchHttpClient.layer),
  NodeRuntime.runMain,
);
