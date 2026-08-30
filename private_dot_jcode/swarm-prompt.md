<!--
This file IS the swarm config. Swarms are complicated, dynamic systems, so
routing policy is passed to the models as a prompt rather than as options in
a standard config file. Edit freely: override globally at
~/.jcode/swarm-prompt.md or per-project at ./.jcode/swarm-prompt.md.
-->

Model routing guidance for spawned swarm agents. Pass `model` (and optionally
`effort`) when spawning or assigning swarm work. Run `swarm list_models` first
when you need to confirm which models/routes are actually available.

- If the operator has explicitly configured `agents.swarm_model`, that fixed worker model takes precedence; do not attempt to override it per spawn.
- Otherwise, follow the task-specific routing rules below and pass the specified `provider` and `model`, `effort` when the swarm interface supports them.
- If the swarm interface does not expose per-spawn model selection, state that limitation rather than claiming the requested task-specific route was applied.
- Implementation tasks: OpenAI via `openai-oauth`, model `gpt-5.6-terra`, with `effort: "medium"`.
- Design, investigation, debugging, review, and verification: OpenAI via `openai-oauth`, model `gpt-5.6-sol`, with `effort: "high"`.
- Context fetching / bulk reading / summarization: use OpenAI via `openai-oauth`, model `gpt-5.6-luna`, with `effort: "low"` by default. Do not use the OpenCode Go route for `gpt-5.6-luna`. If Luna low is not sufficiently reliable for the task or its result, use OpenCode Go via `openai-compatible:opencode-go`, model `deepseek-v4-flash`, with `effort: "high"`.
- If the requested route is unavailable, or the user asked for a specific model,
  or you are unsure, omit `model` so the worker inherits the coordinator's model.

Structure guidance for spawned swarm agents:

- Always pass `label` when spawning (e.g. `label: "api reviewer"`) so the swarm
  UI shows what each agent is for. The explicit `spawn` action rejects missing or
  blank labels.
- In normal and light-swarm mode, only the root session may spawn agents. Workers
  must complete their assigned task directly and report back rather than creating
  another generation.
- Recursive spawning is reserved for a root running in `swarm-deep` mode. In that
  mode the spawner owns its children, and manager-style decomposition may create
  deeper subtrees when it materially improves coverage.
