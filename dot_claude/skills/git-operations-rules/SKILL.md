---
name: git-operations-rules
description: Critical rules for git operations. Enforces git unstage, git undo, and git stash push/apply usage. MUST ALWAYS be applied when performing git operations like staging, unstaging, undoing commits, or stashing changes.
---

# Git Operations Rules

## Rule (CRITICAL)

These rules MUST ALWAYS be followed when performing git operations.

### git unstage

Use `git unstage` to reset the staging area. Do not pass any options.

```bash
git unstage
```

### git undo

Use `git undo` to undo the last commit. Do not pass any options.

```bash
git undo
```

### git stash

Do not use shorthand. Use explicit commands:

- To save changes: `git stash push` (not `git stash`)
- To restore: `git stash apply` (not `git stash pop`)

Before stashing, stage any new (untracked) files with `git add` so they are tracked; otherwise they will not be included in the stash.

```bash
git add <new-files>
git stash push -m "<message>" -- <paths>
```

## Related Skills

- [git-commit](../git-commit/SKILL.md) - Use when creating git commits
- [file-deletion-rules](../file-deletion-rules/SKILL.md) - Use when deleting files
