<!-- Swarm routing policy: global ~/.jcode/swarm-prompt.md, overridden per project by ./.jcode/swarm-prompt.md. -->

# Swarm model routing

## Selection and verification

- If `model` is available, choose an allowed route based on the user's explicit request. If the user did not specify a model or route, use the task defaults below.
- Use `swarm list_models` to verify candidate identifiers and routes. After spawn, use `swarm list` to check the effective route and reasoning effort. If it omits these fields, check `model`, `provider_key`, and `reasoning_effort` in the spawned worker's local session record (`~/.jcode/sessions/<session_id>.json`). A catalog entry or a configured default alone does not prove effective selection.
- When `model` is exposed and allowed by `agents.swarm_model_selection` and `agents.swarm_model_allowlist`, pass the exact model identifier. Do not invent a separate `provider` argument or an unsupported route identifier.
- `agents.swarm_model` is the fallback when `model` is omitted, not a rule for choosing the model when selection is available. If no default is configured, omission inherits the coordinator. Do not change the shared default just to route one lane.
- When `swarm spawn` exposes `effort`, pass the user's requested level or the applicable level below, provided the selected model supports it. Otherwise, omit `effort` and use `agents.swarm_effort` (`high` in this config). Do not change the shared default for one worker.
- Verify the spawned worker's effective model and effort before assigning substantive work. If an explicit request cannot be applied or verified, report the limitation instead of claiming it is active.
- After a user changes the required model, preserve partial edits, drain or stop old-model workers, and continue their tasks on verified new-model workers. Resuming an existing worker must not be described as changing its model unless the effective model was actually changed and checked.

## Task defaults

Select the model based on the task and use `high` as the baseline for reasoning.
Use a lower effort for bounded, routine work only if `swarm spawn` exposes an `effort` argument and the selected model supports that level.

| Task | Model route | Recommended effort |
| --- | --- | --- |
| Bounded source lookup, straightforward extraction, and short summaries | `openai-oauth:gpt-6-luna` | `low` for mechanical work, `medium` when synthesis matters |
| Screenshots, visual comparison, and UI or computer-use verification | `openai-oauth:gpt-6.1-terra` | `medium` for a straightforward visual check, `high` for multi-step verification |
| Implementation, debugging, routine design and review, and text-based verification | `openai-oauth:gpt-6.2-sol` | `high` |
| Advanced architecture or a critical correctness question that remains unresolved | `openai-oauth:gpt-6.2-astra` | `high` |

- Prefer Terra when visual evidence is central to the task, and Sol when code or logs are central.
- Escalate to Astra when a Sol pass leaves a concrete unresolved question, competing explanations, or a verification failure that needs deeper reasoning. State the question, the evidence, and why another Sol pass is unlikely to resolve it.
- Use Astra directly when the user explicitly requests it. Otherwise, a label such as "design", "security", or "review", a large diff, or multiple files alone does not justify Astra.
- Reserve `"xhigh"` or `"max"` for a specific unresolved problem that remained after a high-effort Astra pass, or an explicit user request. Increase effort only when the additional reasoning can change a necessary decision.
- Missing access, unavailable sources, authentication, permissions, and user-controlled prerequisites are blockers, not reasons to change models or increase effort.
- If the requested route is unavailable, report that exact limitation. Obtain approval before substituting a different model or provider. An explicit user model request must not silently fall back to `inherit`.

## Work allocation and handoff

- Always pass a nonempty, task-specific `label` when spawning.
- Give each worker a verifiable outcome, bounded source scope, file ownership, required checks, and a concise reporting contract. Prefer separate files or independent read-only questions over shared writes.
- Use the smallest useful number of workers. Do not fan out several agents over the same question without distinct hypotheses or independently valuable coverage.
- A review worker should judge behavior and evidence independently. Do not use a stronger model as a substitute for running the real acceptance workflow.
- Workers must distinguish verified observations, assumptions, remaining risks, and blockers. Include exact commands, source locations, or URLs sufficient for the coordinator to verify claims.
- On escalation or model change, hand off the unresolved question, relevant evidence, partial edits, and the next discriminating check. Do not restart completed investigation or discard valid work.
- In normal and light-swarm mode, only the root session may spawn agents. Workers complete their assigned tasks directly and report back.
- Recursive spawning is reserved for a root running in `swarm-deep` mode, and only when another level materially improves coverage.
