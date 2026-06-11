# CLAUDE.md

ぶんぶんノート — ランディングページ & ユーザー向けドキュメント (Astro + Starlight)

## 絶対ルール

- CSS/HTML/MDXを変更したら、**必ず `node scripts/screenshot.mjs` でスクリーンショットを撮影し、自分の目で確認してから完了とする。**
- スクリーンショットは 2560, 1920, 1440, 768, 390, 360 の6解像度で撮影される。全てを確認すること。
- デザイン確認せずにCSSの変更を完了としてはならない。

## テックスタック

| 技術 | バージョン |
|------|-----------|
| Astro | ^6.0.1 |
| Starlight | ^0.38.2 |
| Playwright | スクリーンショット撮影用 |

## コマンド

| 操作 | コマンド |
|------|---------|
| dev server | `npm run dev` |
| ビルド | `npm run build` |
| スクリーンショット | `node scripts/screenshot.mjs` |

## デザイン原則

- アプリのトンマナに合わせる（Blue系 #5A7BFA、ポップだが高級感）
- Apple製品ページ（apple.com/jp/macbook-air 等）のレイアウト構造を参考
- ライトモードのみ（ダークモード不要）
- 全解像度（360px〜2560px）で美しく表示
- `vw` ベースの余白・フォントサイズで滑らかにスケール

## ディレクトリ構成

| パス | 内容 |
|------|------|
| `src/content/docs/index.mdx` | LPページ |
| `src/content/docs/guide/` | ユーザー向け使い方ガイド |
| `src/content/docs/faq/` | よくある質問 |
| `src/styles/custom.css` | LP + ドキュメントのカスタムCSS |
| `public/screens/` | アプリスクリーンショット |
| `assets/` | Figmaデザイン原本 |
| `scripts/screenshot.mjs` | スクリーンショット撮影スクリプト |
| `screenshots/` | 撮影結果（gitignore） |
