---
name: jcode-config-reference
description: Regenerate the Japanese Jcode settings reference for this chezmoi repository. Use when a user asks to change Jcode settings, refers to a setting key or row in config-reference.html, or asks to update the reference after a Jcode release.
metadata:
  title: Jcode Settings Reference
  icon: ':lucide:book-open:'
---

# Update the Jcode settings reference

Edit [config.toml](../../../private_dot_jcode/config.toml) as the source of truth.
Use the setting key or link fragment in [config-reference.html](../../../private_dot_jcode/config-reference.html) to locate the setting.
Do not edit the generated HTML.

1. To use a default, remove the active assignment and leave the annotation.
2. To override a default, keep the commented assignment and add an active assignment below it.
   Uncomment the table header if needed.
3. Run the generator from the chezmoi repository root with MoonBit.

```bash
moon run --target wasm --target-dir tmp/jcode-reference-moon .agent/skills/jcode-config-reference/scripts/generate.mbtx
```

Append `-- --check` to compare the existing HTML without writing it.
Commit the HTML and the source changes together.
If asked to apply a setting locally, apply only `~/.jcode/config.toml` with chezmoi.

## Annotations

```toml
# @jcode v1.0.3 a0ae514c45451f12d5633ed4fa7c71614a9f4a42
# @group 画面・入力
# @section 端末画面とセッション一覧
# @source crates/jcode-config-types/src/display.rs#L12
# [display]

# @effect モデルの推論を会話内にどこまで表示するか決める。
# @values "off"、"current"、"full"。
# reasoning_display = "full"
```

- Use `# @note ...` between `@source` and the table header to add a section note.
- End each setting block with a single-line commented TOML assignment, `# @unset key` for an absent default, or `# @table-default label` for a row that covers the whole table.
- Keep `# @...` lines outside TOML multiline strings.
  Descriptions are plain text, not HTML.
- Keep credentials in Jcode's auth store or environment variables.
  The HTML shows active values from the checked-in TOML.
- When updating Jcode, verify defaults against the new macOS CLI and source.
  Update the version, revision, and source anchors in the TOML as needed.
