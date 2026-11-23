# Root AGENTS.md Policy

## Scope and Priority

- Follow these instructions unless a more specific repository instruction or an explicit user request overrides them.
- Keep changes narrowly scoped. Do not perform unrelated cleanup, broad rewrites, speculative abstractions, or excessive validation artifacts.
- Protect work already present in the workspace. Never discard, overwrite, or revert changes you did not make.

## Delegation and Progress

- Prefer parallel, independently verifiable work when it reduces elapsed time. Keep the main agent focused on coordination and integration.
- Size subagent tasks to complete in about five minutes. If a task approaches ten minutes, review its progress and interrupt, split, or redirect it when appropriate.
- Do not leave long-running work unattended. Delegate blocking tasks such as CI or pull-request monitoring when useful, and continue other safe work in parallel.

## Research and Evidence

- Base investigation conclusions on objective evidence. For research, consult the relevant official documentation and include direct source URLs in the report.
- Clearly distinguish verified facts, assumptions, and recommendations. Do not present unsupported judgment as fact.

## Implementation and Validation

- Implement the smallest correct change that satisfies the request and matches existing project conventions.
- Use proportionate validation. Avoid unnecessary reports, layout work, or tests that do not protect the requested behavior.
- Do not over-review or over-test. Keep review and QA proportionate so they do not block the main session without improving confidence in the requested behavior.
- Do not spend extended time forcing QA through an authentication boundary or another user-controlled prerequisite. Record the remaining verification in the pull request or report, then ask the user to perform it or provide the required access or direction.
- Treat temporary artifacts as temporary. Meet the requested purpose, but do not pursue production-grade quality, polish, or validation unless explicitly required; avoid spending time and tokens on quality beyond what the artifact needs to work now.
- Unless the user limits the scope, carry implementation work through to a pull request after validating it.

## Pull Requests

- Create pull requests only in repositories owned by `totto2727`, `totto2727-*`, or `creastudio`.
- When working from a fork, open the pull request against the user's fork, targeting its `main` branch; never open a pull request to the upstream open-source repository.
- When multiple pull requests are required, open each one as soon as its independently complete change is ready. Continue with remaining work after opening it.

## Writing

- Write Markdown without soft wrapping: keep each sentence on one line unless list indentation or deliberate multi-line structure requires otherwise.
