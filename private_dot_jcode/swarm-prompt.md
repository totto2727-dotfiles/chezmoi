<!-- Swarm routing policy: global ~/.jcode/swarm-prompt.md, overridden per project by ./.jcode/swarm-prompt.md. -->

# Swarm model routing

## Selection and verification

- If `model` is available, choose an allowed route based on the user's explicit request. If the user did not specify a model or route, use the task defaults below.
- The standard model family is OpenAI Sol 6.2 and Astra 6.2 through `openai-oauth`. Do not silently use an older Sol, Astra, or another provider.
- Use `swarm list_models` to verify candidate identifiers and routes. Use `swarm list` after spawn to verify the worker's effective model and reasoning effort. A catalog entry or a configured default alone does not prove effective selection.
- When `model` is exposed and allowed by `agents.swarm_model_selection` and `agents.swarm_model_allowlist`, pass the exact model identifier. Pass `effort` only if the tool exposes it. Do not invent a separate `provider` argument or an unsupported route identifier.
- `agents.swarm_model` is the fallback when `model` is omitted, not a rule for choosing the model when selection is available. If no default is configured, omission inherits the coordinator. Do not change the shared default just to route one lane.
- Verify the spawned worker's effective model before assigning substantive work. If selection is unavailable or cannot be verified, report the limitation instead of claiming that the requested model is active.
- After a user changes the required model, preserve partial edits, drain or stop old-model workers, and continue their tasks on verified new-model workers. Resuming an existing worker must not be described as changing its model unless the effective model was actually changed and checked.

## Task defaults

- Implementation, debugging, investigation, routine architecture, review, and verification: `openai-oauth:gpt-6.2-sol`, normally `effort: "medium"`. Use `"high"` for a concrete need for deeper cross-file reasoning, difficult diagnosis, or a demanding independent review, not just for task size.
- Context fetching, bulk reading, extraction, and summarization: `openai-oauth:gpt-6.2-sol`, normally `effort: "medium"`, with bounded source scope and an explicit output contract. Do not add a separate older-model route merely because the work is mechanical.
- Advanced architectural judgment or a critical unresolved correctness question: `openai-oauth:gpt-6.2-astra`, normally `effort: "high"`. Escalate after Sol identifies a concrete unresolved question, competing explanations, or a verification failure that requires stronger reasoning. State the question, evidence already gathered, and why another Sol pass is unlikely to resolve it.
- Use Astra directly when the user explicitly requests it. Otherwise, a label such as "design", "security", or "review", a large diff, or multiple files alone does not justify Astra.
- Reserve `"xhigh"` or `"max"` for a specific unresolved problem that remained after a high-effort Astra pass, or an explicit user request. Increase effort only when the additional reasoning can change a necessary decision.
- Missing access, unavailable sources, authentication, permissions, and user-controlled prerequisites are blockers, not reasons to change models or increase effort.
- If the requested 6.2 route is unavailable, report that exact limitation. Obtain approval before substituting an older model or a different provider. An explicit user model request must not silently fall back to `inherit`.

## Work allocation and handoff

- Always pass a nonempty, task-specific `label` when spawning.
- Give each worker a verifiable outcome, bounded source scope, file ownership, required checks, and a concise reporting contract. Prefer separate files or independent read-only questions over shared writes.
- Use the smallest useful number of workers. Do not fan out several agents over the same question without distinct hypotheses or independently valuable coverage.
- A review worker should judge behavior and evidence independently. Do not use a stronger model as a substitute for running the real acceptance workflow.
- Workers must distinguish verified observations, assumptions, remaining risks, and blockers. Include exact commands, source locations, or URLs sufficient for the coordinator to verify claims.
- On escalation or model change, hand off the unresolved question, relevant evidence, partial edits, and the next discriminating check. Do not restart completed investigation or discard valid work.
- In normal and light-swarm mode, only the root session may spawn agents. Workers complete their assigned tasks directly and report back.
- Recursive spawning is reserved for a root running in `swarm-deep` mode, and only when another level materially improves coverage.
