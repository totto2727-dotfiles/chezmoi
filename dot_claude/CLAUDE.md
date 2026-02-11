# Guidelines

## Basic Rules

- **Parallel Execution**: Execute independent processes concurrently
- **Agent Priority**: Prioritize using Agents whenever possible for all tasks
- **Planning**: Create execution plans as a general principle
- **TODO Management**: Always create TODO tasks even for minor tasks
- **TODO Triage**: When user feedback is received during work, assess whether it is urgent and related to the current task or a subsequent task, and update TODOs accordingly
- **No Command Chaining**: As a general rule, execute Bash commands one at a time instead of chaining with `&&`, `||`, or `;` to avoid sandbox detection issues

## Language Rules

- **Chat Response**: Always respond in Japanese
- **Markdown Output**: Always output documentation in English
- **Commit Messages**: Follow the language pattern of existing commits in the repository

## Development Rules

- Follow existing code patterns
- Manage sensitive information properly
- Strictly follow Conventional Commits
- Keep output to the absolute minimum required
  - No excessive decoration or unnecessary specifications
- **No Comments**: Never add comments unless explicitly instructed
- **Typo Detection**: Always point out typos and errors found in existing code and documentation
