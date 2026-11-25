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

Route each worker by the judgment it needs, how much of the approach is already decided, and whether the main work is visual or can be split into independent batches. The effort column applies only when `swarm spawn` supports individual effort selection.

| Task | Model route | Recommended effort |
| --- | --- | --- |
| Everyday, bounded work with little ambiguity. Examples: quick questions, short drafts, and small edits. | `openai-oauth:gpt-6.2-sol` | `low` |
| Work that requires investigation, synthesis, or choosing between plausible approaches. Examples: coding or debugging, comparing options, planning, and drafting a recommendation from evidence. | `openai-oauth:gpt-6.2-sol` | `high` |
| Work that needs deeper reasoning than Sol at `high` can reliably provide. Examples: high-stakes decisions, designs with tightly coupled trade-offs, and large projects whose parts cannot be planned independently. | `openai-oauth:gpt-6.2-astra` | `high` |
| Execution with clear steps and acceptance criteria, or work centered on visual evidence or a GUI. Examples: implementing an agreed change, updating documents to a defined format, and checking screenshots or workflows. | `openai-oauth:gpt-6.1-terra` | `medium` |
| High-volume work that can be split into independent batches. Examples: collecting sources, extracting fields, and classifying records. | `openai-oauth:gpt-6-luna` | `low` for routine collection and extraction, `medium` for reconciling conflicting sources within a batch |

- When it helps to split the work, separate evidence gathering, decisions, and execution. For example, use Luna to collect evidence in batches, Sol at `high` to weigh it and decide on a plan, and Terra to carry out the agreed steps when that execution can be verified independently.
- Use Astra directly when the task clearly exceeds Sol at `high` or the user requests it. Otherwise, escalate when a Sol pass leaves a concrete unresolved question, competing explanations, or a verification failure that needs deeper reasoning. State what makes the task hard and cite the evidence. A label, diff size, or file count alone does not justify escalation.
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
