<!-- Swarm routing policy: global ~/.jcode/swarm-prompt.md, overridden per project by ./.jcode/swarm-prompt.md. -->

Model routing guidance for spawned swarm agents:

- Priority: an explicit user request for a worker model or route, then configured `agents.swarm_model`, then the task-specific defaults below.
- Honor an explicit user-requested worker model or route using a supported `model` value. If it is unavailable or cannot be selected, report the limitation instead of silently substituting a different model.
- Without an explicit user override, preserve configured `agents.swarm_model` by omitting `model`; do not override it with task-specific defaults.
- For task-specific routing, pass `model` and optionally `effort`. There is no separate `provider` argument in the current swarm interface. Use `swarm list_models` to confirm available models/routes and use a supported `model` identifier for the intended route rather than inventing a provider argument or route identifier.
- If the swarm interface cannot select the intended model or route, state that limitation rather than claiming it was applied.
- Implementation tasks: OpenAI via `openai-oauth`, model `gpt-6.1-sol`, with `effort: "medium"`.
- Design, investigation, debugging, review, and verification: default to OpenAI via `openai-oauth`, model `gpt-6.1-sol`, with `effort: "medium"`. Routine design decisions, substantive judgment, cross-file reasoning, root-cause analysis, and correctness or security reviews should start on this route, not automatically on Astra.
- Escalation only: use OpenAI via `openai-oauth`, model `gpt-6-astra`, with `effort: "high"` or higher (`"xhigh"` or `"max"`) only when Sol cannot resolve a required judgment or the task needs advanced architectural design beyond Sol's capability. State the concrete unresolved question and why Sol is insufficient before escalating. Task size, multiple files, or the label "design" or "review" alone is not a reason to escalate. Missing access, unavailable sources, or user-controlled prerequisites are blockers, not reasons to escalate.
- Purely mechanical checks, such as locating symbols, extracting facts, or summarizing a small diff without assessing correctness, may use the context-fetching route below. Do not downgrade a task solely because its input or diff is small.
- Context fetching / bulk reading / summarization: use OpenAI via `openai-oauth`, model `gpt-6-luna`, with `effort: "high"` by default. Do not use the OpenCode Go route for `gpt-6-luna`.
- If Luna's result omits required information, contradicts the supplied sources, or fails the requested output requirements, retry with OpenAI via `openai-oauth`, model `gpt-6.1-sol`, with `effort: "medium"`. Missing access or unavailable source material is a blocker to report, not a reason to retry with another model.
- If a context-fetching task turns out to require substantive investigation or judgment, reclassify it and use the Sol design/investigation route rather than treating it as a summarization retry. Apply the same escalation-only condition before considering Astra.
- If a task-specific default route is unavailable or uncertain after checking available routes, and neither an explicit user choice nor configured `agents.swarm_model` applies, use `model: "inherit"` to explicitly inherit the coordinator's model and route. Disclose the fallback.
- Omitting `model` uses configured `agents.swarm_model` when set, otherwise it inherits the coordinator's model. Do not describe omission as unconditional coordinator inheritance.

Structure guidance for spawned swarm agents:

- Always pass `label` when spawning (e.g. `label: "api reviewer"`) so the swarm UI shows what each agent is for. The explicit `spawn` action rejects missing or blank labels.
- In normal and light-swarm mode, only the root session may spawn agents. Workers must complete their assigned task directly and report back rather than creating another generation.
- Recursive spawning is reserved for a root running in `swarm-deep` mode. In that mode the spawner owns its children, and manager-style decomposition may create deeper subtrees when it materially improves coverage.
