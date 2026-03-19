#!/usr/bin/env -S deno run --allow-ffi --allow-read --allow-env --allow-net
// Cloudflare Browser Rendering Markdown API client

import { Console, Effect, Option, Schema } from "jsr:@totto2727/fp@3.0/effect";
import { Command, Options } from "jsr:@totto2727/fp@3.0/effect/cli";
import {
  FetchHttpClient,
  HttpClient,
  HttpClientRequest,
  HttpClientResponse,
} from "jsr:@totto2727/fp@3.0/effect/platform";
import { NodeContext, NodeRuntime } from "jsr:@totto2727/fp@3.0/effect/platform/node";
import * as process from "node:process";

const getEnvOrFail = (name: string) =>
  Effect.sync(() => {
    const value = process.env[name];
    if (!value) throw new Error(`Environment variable ${name} is not set`);
    return value;
  });

const RenderResponse = Schema.Struct({
  result: Schema.String,
});

const url = Options.text("url").pipe(Options.optional);
const html = Options.text("html").pipe(Options.optional);
const waitUntil = Options.choice("wait-until", [
  "load",
  "domcontentloaded",
  "networkidle0",
  "networkidle2",
]).pipe(Options.optional);
const reject = Options.text("reject").pipe(Options.repeated);
const userAgent = Options.text("user-agent").pipe(Options.optional);

const root = Command.make(
  "web2md",
  { url, html, waitUntil, reject, userAgent },
  ({ url, html, waitUntil, reject, userAgent }) =>
    Effect.gen(function* () {
      const urlValue = Option.getOrUndefined(url);
      const htmlValue = Option.getOrUndefined(html);
      const waitUntilValue = Option.getOrUndefined(waitUntil);
      const userAgentValue = Option.getOrUndefined(userAgent);

      if (!urlValue && !htmlValue) {
        yield* Console.error("Either --url or --html must be specified");
        return;
      }

      const accountId = yield* getEnvOrFail("CLOUDFLARE_ACCOUNT_ID");
      const apiToken = yield* getEnvOrFail("CLOUDFLARE_MARKDOWN_API_KEY");

      const client = (yield* HttpClient.HttpClient).pipe(HttpClient.filterStatusOk);

      const rejectArray = Array.from(reject);
      const body = {
        url: urlValue,
        html: htmlValue,
        gotoOptions: waitUntilValue ? { waitUntil: waitUntilValue } : undefined,
        rejectRequestPattern: rejectArray.length > 0 ? rejectArray : undefined,
        userAgent: userAgentValue,
      };

      const apiUrl = `https://api.cloudflare.com/client/v4/accounts/${accountId}/browser-rendering/markdown`;
      const req = yield* HttpClientRequest.post(apiUrl).pipe(
        HttpClientRequest.bearerToken(apiToken),
        HttpClientRequest.bodyJson(body),
      );

      const response = yield* client.execute(req);
      const parsed = yield* HttpClientResponse.schemaBodyJson(RenderResponse)(response);
      yield* Console.log(parsed.result);
    }).pipe(
      Effect.catchTag("ResponseError", (e) =>
        Effect.gen(function* () {
          const body = yield* e.response.text.pipe(Effect.catchAll(() => Effect.succeed("")));
          yield* Console.error(`API request failed: ${e.response.status} ${e.message}`);
          if (body) yield* Console.error(`Details: ${body}`);
          yield* Effect.fail(e);
        }),
      ),
      Effect.catchTag("ParseError", (e) =>
        Effect.gen(function* () {
          yield* Console.error(`Failed to parse response: ${e.message}`);
          yield* Effect.fail(e);
        }),
      ),
    ),
);

const cli = Command.run(root, {
  name: "web2md",
  version: "1.0.0",
});

cli(process.argv).pipe(
  Effect.provide(NodeContext.layer),
  Effect.provide(FetchHttpClient.layer),
  NodeRuntime.runMain,
);
