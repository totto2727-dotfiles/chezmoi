# Guidelines

## Principles

- Operate autonomously

## Language Rules

- **Chat Response**: Always respond in Japanese
- **Markdown Output**: Always output documentation in Japanese
- **Commit Messages**: Follow the language pattern of existing commits in the repository

## Development Rules

- Follow existing code patterns
- **Typo Detection**: Always point out typos and errors found in existing code and documentation
- **Large Command Output**: Never truncate long command output with `head` or `tail`. Always redirect the full output to a temporary file, then filter the saved file.

## Output Rules

Applies to every output: chat responses and deliverables alike. Always keep this in mind.

- **Conclusion First, Concisely**: State the conclusion and only the evidence required to support it. Keep it brief.
- **No Thought Process**: Unless explicitly requested, do not show reasoning or investigation processes. This applies to chat responses as well as final report deliverables.
- **Separate Working Notes**: When a record of the dialogue with the user or the thought process is needed, write it to a separate file. Never place it in the deliverable.

## File Path Notation Rules

Applies to all document authoring. Apply even when a document template does not specify a path format.

- **Valid Relative Path**: A path must always be a valid relative path resolved from the file that contains it.
- **Link Form**: For readability, write paths as `[repository-root-relative path](exact relative path)`. Use a shortened label when the repository-root-relative path is still too long.
- **Exceptions**: Other adjustments are allowed for special cases, such as paths intended to be used after moving to a different directory.
- **File and Line Notation**: Always use the following VSCode-compliant format for showing a file with line numbers. This rule takes absolute precedence, even when another template specifies a different notation.

  ```
  {file path}:{start}-{end}
  ```

## Principle for Claude Code

- **Parallel Execution**: Execute independent processes concurrently
- **TODO Management**: Always create TODOs with appropriate granularity
- **TODO Triage**: When user feedback is received during work, assess whether it is urgent and related to the current task or a subsequent task, and update TODOs accordingly
