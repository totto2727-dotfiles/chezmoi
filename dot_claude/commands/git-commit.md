# Git Commit Command

This command analyzes the current git changes and creates appropriately granular commits with Conventional Commits format messages.

$ARGUMENTS

!git status
!git diff --staged
!git diff
!git log --oneline -10

Analyze the staged and unstaged changes to create appropriate commits with granular scope. Follow these requirements:

1. **Granular Commits**: Create separate commits for logically distinct changes
2. **Conventional Commits**: Use format: `type(scope): description`
   - **Types**: feat, fix, docs, style, refactor, test, chore, build, ci, perf
   - **Scope**: Optional, indicates what is being modified
   - **Description**: Concise description

3. **Language Detection**: Analyze the recent commit messages from `git log` to determine the language pattern used in this repository and follow the same language for new commit messages

4. **Process**: 
   - Analyze all changes (staged and unstaged)
   - Group related changes logically
   - Stage and commit each group separately
   - Provide clear explanations for each commit

Execute the analysis and create the commits with proper conventional commit messages following the repository's language pattern.