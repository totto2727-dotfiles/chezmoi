---
name: deno-disposable-scripts
description: Coding rules for creating disposable Deno scripts. Avoid URL imports, use npm: and jsr: prefixes, and minimize access to external packages. Apply when creating disposable or temporary Deno scripts.
---

# Deno Disposable Scripts

## Execution

```bash
# Assign appropriate permissions
sfw deno run --allow-net {{filename}}
```

## Quick Start

Three principles for creating disposable scripts:

1. Avoid URL imports
2. Use `npm:` / `jsr:` prefixes
3. Minimize access to external packages

## Import Rules

### Correct Format

```typescript
// npm packages
import { z } from "npm:zod@3.22.4";

// jsr packages
import { Hono } from "jsr:@hono/hono@4.0.0";
import { HttpException } from "jsr:@hono/hono@4.0.0/http-exception";

// Deno standard library (via jsr)
import { join } from "jsr:@std/path@1.0.0";
import { parse } from "jsr:@std/yaml@1.0.0";
```

### Incorrect Format

```typescript
// NG: URL imports
import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";
```

## Best Practices

### Prefer Deno Built-in APIs

Before using external packages, check if Deno built-in APIs can accomplish the task:

```typescript
// File operations
const content = await Deno.readTextFile("./data.json");
await Deno.writeTextFile("./output.txt", result);

// Directory operations
await Deno.mkdir("./output", { recursive: true });
for await (const entry of Deno.readDir("./src")) {
  console.log(entry.name);
}

// Environment variables
const apiKey = Deno.env.get("API_KEY");

// Command execution
const command = new Deno.Command("git", {
  args: ["status"],
  stdout: "piped",
});
const { stdout } = await command.output();
```

### Minimal Dependencies

Import only what you need:

```typescript
// OK: Import only required functions
import { parse } from "jsr:@std/yaml@1.0.0";

// NG: Import entire package
import * as yaml from "jsr:@std/yaml@1.0.0";
```

## Examples

### Good Example

```typescript
import { parse } from "jsr:@std/yaml@1.0.0";

const config = parse(await Deno.readTextFile("./config.yaml"));
console.log(config);
```

### Bad Example

```typescript
// NG: URL import
import { parse } from "https://deno.land/std@0.208.0/yaml/mod.ts";

// NG: Unnecessary external package
import * as fs from "npm:fs-extra";
```

## Additional Resources

- [Deno.\* API Reference](https://docs.deno.com/api/deno/all_symbols) - Deno built-in API reference
