---
name: use-grealpath
description: Enforces using grealpath command for relative path calculations and absolute path conversions. Use when calculating relative paths between files, converting relative paths to absolute paths, or working with file path operations.
---

# Use grealpath for Path Operations

## Rule (CRITICAL)

**ALWAYS** use `grealpath` command for:

- Calculating relative paths between files/directories
- Converting relative paths to absolute paths
- Resolving symbolic links to absolute paths

## Relative Path Calculation

Use `grealpath --relative-to=<base>` to calculate relative paths:

```bash
# Calculate relative path from base directory to target
grealpath --relative-to=/home/user /home/user/test
# Output: test

# Calculate relative path from current directory
grealpath --relative-to=. ./subdir/file.txt
# Output: subdir/file.txt

# Calculate relative path between two specific paths
grealpath --relative-to=/path/to/base /path/to/base/subdir/file.txt
# Output: subdir/file.txt
```

## Absolute Path Conversion

Use `grealpath` to convert relative paths to absolute paths:

```bash
# Convert relative path to absolute path
grealpath ./subdir/file.txt
# Output: /home/user/project/subdir/file.txt

# Convert with current directory as base
grealpath file.txt
# Output: /home/user/project/file.txt

# Resolve symbolic links to absolute paths
grealpath symlink
# Output: /home/user/project/actual/path
```

## Common Use Cases

### Getting Relative Path Between Two Files

```bash
# From file A to file B
grealpath --relative-to=/path/to/fileA /path/to/fileB
```

### Converting Relative to Absolute

```bash
# Simple conversion
grealpath relative/path/to/file

# With base directory
grealpath --relative-to=/base/dir relative/path
```

### Resolving Paths with Symbolic Links

```bash
# Resolve all symbolic links
grealpath -s symlink
# Or without -s flag (default behavior resolves symlinks)
grealpath symlink
```

## Examples

### Good: Using grealpath

```bash
# Calculate relative path
grealpath --relative-to=/home/user /home/user/project/src/file.ts
# Output: project/src/file.ts

# Convert to absolute path
grealpath ./src/file.ts
# Output: /home/user/project/src/file.ts

# Resolve symbolic link
grealpath ./link-to-file
# Output: /home/user/project/actual/file.ts
```

### Bad: Manual Path Manipulation

```bash
# DO NOT manually calculate relative paths
# DO NOT use cd and pwd combinations
# DO NOT use string manipulation for paths
```

## Notes

- `grealpath` is the GNU version of `realpath` (Mac uses BSD version by default)
- Always use `grealpath` instead of `realpath` for consistent behavior
- The `--relative-to` option requires GNU coreutils
- Paths are normalized (removes `.` and `..` components)
