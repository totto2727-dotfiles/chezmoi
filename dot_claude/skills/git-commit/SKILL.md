---
name: git-commit
description: Analyzes git changes and creates granular commits with Conventional Commits format messages. Detects repository language pattern from recent commits. **MUST ALWAYS be used when creating git commits, regardless of whether the user explicitly requests it or not.**
---

# Git Commit Command

**IMPORTANT: This skill MUST ALWAYS be applied when creating git commits, even if the user does not explicitly request it.**

This skill analyzes git changes and creates appropriately granular commits with Conventional Commits format messages. It should be automatically invoked whenever you need to create commits, stage files, or handle git changes.

## Workflow

**This skill must be applied automatically whenever you create git commits, regardless of user instructions.**

When creating commits:

1. **Gather Information**:

   ```bash
   git status
   git diff --staged
   git diff
   git log --oneline -10
   ```

2. **Analyze Changes**:
   - Review staged and unstaged changes
   - Identify logically distinct change groups
   - Detect language pattern from recent commits (`git log`)

3. **Create Granular Commits**:
   - Group related changes logically
   - Create separate commits for each group
   - Use Conventional Commits format

## Requirements

### 1. GPG Signing (CRITICAL)

Commits without GPG signatures are **strictly prohibited**. Never use `--no-gpg-sign` or disable signing.

If a GPG signing error or hang occurs:

1. **Stop all work immediately**
2. Report the error message and current state
3. Do not attempt workarounds or unsigned commits

### 2. Granular Commits

Create separate commits for logically distinct changes. Do not combine unrelated modifications into a single commit.

### 3. Conventional Commits Format

Use format: `type(scope): description`

**Types**:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `build`: Build system changes
- `ci`: CI/CD changes
- `perf`: Performance improvements

**Scope**: Optional, indicates what is being modified (e.g., `auth`, `cart`, `payment`)

**Description**: Concise description in present tense, lowercase (except proper nouns)

### 4. Language Detection

Analyze recent commit messages from `git log --oneline -10` to determine the language pattern used in the repository. Follow the same language for new commit messages.

### 5. Direct File Modification Prohibited

Do not use file editing tools (e.g., `write`, `search_replace`) to modify files directly. Always use git commands to stage and commit changes:

- Use `git add <file>` or `git add -p` for staging
- Use `git apply --cached` when staging specific hunks from diffs
- Use `git commit` for creating commits

### 6. Process

1. Analyze all changes (staged and unstaged)
2. Group related changes logically
3. Stage and commit each group separately using git commands
4. Provide clear explanations for each commit

## Tips

- Use `git diff` to see changes
- Use `git apply --cached <patch-file>` to stage only necessary changes
- If `git apply --cached` fails, run `git diff` again and recreate the diff file
- Use `git add -p` for interactive staging when needed
- Review each commit message before finalizing

## Examples

### Example 1: Multiple unrelated changes

```txt
Changes detected:
- Added new authentication endpoint
- Fixed cart calculation bug
- Updated README documentation

Creates 3 separate commits:
1. feat(auth): add login endpoint
2. fix(cart): correct price calculation
3. docs: update README with setup instructions
```

### Example 2: Related changes grouped together

```txt
Changes detected:
- Added product search function
- Added product search tests
- Updated product search documentation

Creates 1 commit:
feat(product): implement search functionality
```

### Example 3: Language detection

```txt
Recent commits show Japanese messages:
- feat: add authentication feature
- fix: fix cart calculation bug

Follows detected pattern:
- feat: add product search functionality
```
