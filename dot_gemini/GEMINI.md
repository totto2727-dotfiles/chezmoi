# Claude Code Guidelines

## Basic Rules

- **Parallel Execution**: Execute independent processes concurrently
- **Agent Priority**: Prioritize using Agents whenever possible for all tasks
- **Planning**: Create execution plans as a general principle

## Language Rules

- **Chat Response**: Always respond in Japanese
- **Markdown Output**: Always output documentation in Japanese
- **Commit Messages**: Follow the language pattern of existing commits in the repository

## Development Rules

- Follow existing code patterns
- Manage sensitive information properly
- Strictly follow Conventional Commits
- Keep output to the absolute minimum required
  - No excessive decoration or unnecessary specifications
- **No Comments**: Never add comments unless explicitly instructed
- **Typo Detection**: Always point out typos and errors found in existing code and documentation

### Code Analysis and Search

- **serena MCP Priority**: When serena MCP is available, use serena MCP tools for code search and analysis

### File Deletion Rules

- **rm is strictly prohibited**: Never use `rm` or `unlink` commands
- **Always use git stash before deletion**: Save files to git stash before removing them

#### Deletion Process

**For modified files (tracked & modified)**:

1. Save changes: `git stash push -m "[Claude Code Deletion] <reason>" -- <files>`
2. Remove file: `git rm <files>`

**For new files (untracked)**:

1. Stage file: `git add <files>`
2. Save to stash: `git stash push -m "[Claude Code Deletion] <reason>" -- <files>`
   (File is automatically removed from working tree after stashing)

**Stash message template**:

```text
[Claude Code Deletion] <reason>
Files: <file1>, <file2>, ...
```

Examples:

- `[Claude Code Deletion] Remove deprecated API endpoints`
- `[Claude Code Deletion] Clean up unused test fixtures`
