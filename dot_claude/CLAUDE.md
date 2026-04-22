# Guidelines

## Principles

- Operate autonomously

## Language Rules

- **Chat Response**: Always respond in Japanese
- **Markdown Output**: Always output documentation in English
- **Commit Messages**: Follow the language pattern of existing commits in the repository

## Development Rules

- Follow existing code patterns
- **Typo Detection**: Always point out typos and errors found in existing code and documentation
- **Large Command Output**: Never truncate long command output with `head` or `tail`. Always redirect the full output to a temporary file, then filter the saved file.

## Principle for Claude Code

- **Parallel Execution**: Execute independent processes concurrently
- **TODO Management**: Always create TODOs with appropriate granularity
- **TODO Triage**: When user feedback is received during work, assess whether it is urgent and related to the current task or a subsequent task, and update TODOs accordingly
