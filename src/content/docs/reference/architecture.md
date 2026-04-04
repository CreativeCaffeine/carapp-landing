---
title: アーキテクチャ
description: carappのアーキテクチャ概要
---

:::note
このドキュメントはcarappのソースコードから自動生成されています。
:::

## ディレクトリ構成

```
lib/
├── database/       # Drift DB定義・DAO・マイグレーション
│   └── connection/ # DB接続設定
├── models/         # データモデル（Freezed等）
├── providers/      # Riverpod Provider定義
├── screens/        # 画面Widget（1画面1ディレクトリ）
├── services/       # ビジネスロジック・外部API連携
├── theme/          # テーマ定義（色・タイポグラフィ・スペーシング）
├── utils/          # ユーティリティ関数
└── widgets/        # 共通Widget
```

## アーキテクチャパターン

### 状態管理: Riverpod

- `lib/providers/` にProvider定義を集約
- `StateNotifierProvider` / `FutureProvider` / `StreamProvider` を用途に応じて使い分け
- 画面WidgetはProviderを `ref.watch` で購読

### データベース: Drift (SQLite)

- `lib/database/` にテーブル定義・DAO・マイグレーションを集約
- 型安全なクエリビルダでSQLを直接書かない
- バージョン管理されたマイグレーションでスキーマ変更を安全に適用

### ルーティング: GoRouter

- 宣言的ルーティング
- ディープリンク対応
- ガード（認証チェック等）

### テーマ: 集約型

- `lib/theme/app_theme.dart` に `AppColors`, `AppTextStyles`, `AppRadius`, `AppSpacing`, `AppShadows` を定義
- GoogleFonts (Inter) + Noto Sans JP フォールバック
