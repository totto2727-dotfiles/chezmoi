---
name: script-creation-rules
description: Enforces using shell script one-liners as the primary approach for scripts. Prohibits Node.js and Python usage. Use TypeScript with Deno only when variables or complex branching are necessary. MUST ALWAYS be applied when creating scripts, automation tasks, or executing commands.
---

# Script Creation Rules

## Rule (CRITICAL)

When creating scripts, follow this priority order:

1. **First choice**: Shell script one-liners
2. **Second choice**: TypeScript with Deno (only when variables or complex branching are necessary)
3. **Prohibited**: Node.js and Python

## Priority Order

### 1. Shell Script One-Liners (PREFERRED)

Use shell script one-liners for simple operations:

```bash
# File operations
find . -name "*.js" -type f | xargs grep "pattern"

# Text processing
cat file.txt | grep "pattern" | sed 's/old/new/g'

# File counting
ls -1 | wc -l

# Directory operations
mkdir -p path/to/dir && cd path/to/dir

# Conditional execution
[ -f file.txt ] && echo "exists" || echo "not found"
```

### 2. TypeScript with Deno (When Necessary)

Use TypeScript with Deno only when:

- Variables are needed for complex logic
- Complex branching/conditionals are required
- Error handling beyond simple shell constructs is needed

**Execution**: Always use `sfw deno run <file>` to execute Deno scripts.

```typescript
// Example: Complex script with variables and branching
const files = Deno.readDirSync(".");
const results: string[] = [];

for (const file of files) {
  if (file.isFile && file.name.endsWith(".ts")) {
    const content = Deno.readTextFileSync(file.name);
    if (content.includes("pattern")) {
      results.push(file.name);
    }
  }
}

console.log(results.join("\n"));
```

Execute with:

```bash
sfw deno run --allow-read script.ts
```

**IMPORTANT**: Always use `sfw deno run` instead of `deno run` directly.

## Prohibited Technologies

The following are **strictly prohibited**:

- **Node.js**: `node script.js`, `npm run`, etc.
- **Python**: `python script.py`, `python3 script.py`, `pip install`, etc.
- **Direct Deno execution**: `deno run` (use `sfw deno run` instead)

## Decision Flow

When creating a script:

1. **Can it be done with a shell one-liner?** -> Use shell script
2. **Does it need variables or complex logic?** -> Use TypeScript with Deno (execute with `sfw deno run <file>`)
3. **Never use Node.js or Python**
4. **Never use `deno run` directly** -> Always use `sfw deno run`

## Examples

### Good: Shell One-Liner

```bash
# Find and count TypeScript files
find . -name "*.ts" -type f | wc -l
```

### Good: TypeScript with Deno

```typescript
// Complex file processing with error handling
try {
  const files = Array.from(Deno.readDirSync(".")).filter((f) => f.isFile && f.name.endsWith(".ts"));

  for (const file of files) {
    const content = Deno.readTextFileSync(file.name);
    // Complex processing...
  }
} catch (error) {
  console.error("Error:", error);
}
```

### Bad: Node.js

```javascript
// DO NOT USE
const fs = require("fs");
const files = fs.readdirSync(".");
```

### Bad: Python

```python
# DO NOT USE
import os
files = os.listdir('.')
```

## Common Patterns

### File Operations

```bash
# Shell one-liner
find . -type f -name "*.md" -exec wc -l {} \;
```

### Text Processing

```bash
# Shell one-liner
grep -r "pattern" . | sed 's/old/new/g' | sort | uniq
```

### Conditional Logic (Simple)

```bash
# Shell one-liner
[ -d "dir" ] && echo "exists" || mkdir -p "dir"
```

### Conditional Logic (Complex)

```typescript
// TypeScript with Deno
const dirs = ["dir1", "dir2", "dir3"];
for (const dir of dirs) {
  try {
    const stat = Deno.statSync(dir);
    if (stat.isDirectory) {
      console.log(`${dir} exists`);
    }
  } catch {
    Deno.mkdirSync(dir, { recursive: true });
    console.log(`Created ${dir}`);
  }
}
```

Execute with:

```bash
sfw deno run --allow-read --allow-write script.ts
```
