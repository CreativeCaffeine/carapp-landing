#!/usr/bin/env bash
set -euo pipefail

input="$(cat)"
file="$(echo "$input" | jq -r '.tool_input.file_path // .tool_input.path // empty')"

# Only trigger on CSS, MDX, HTML, Astro files
case "$file" in
  *.css|*.mdx|*.html|*.astro) ;;
  *) exit 0 ;;
esac

jq -n '{
  decision: "block",
  reason: "Design file changed — visual verification required",
  hookSpecificOutput: {
    hookEventName: "PostToolUse",
    additionalContext: "CSS/HTML/MDXファイルが変更されました。必ず `node scripts/screenshot.mjs` でスクリーンショットを撮影し、Read toolで全解像度の画像を確認してからユーザーに報告してください。確認せずに完了としないこと。"
  }
}'
