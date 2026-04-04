---
title: テックスタック
description: carappで使用している技術スタック
---

:::note
このドキュメントはcarappのソースコードから自動生成されています。
:::

## コア技術

| 技術 | バージョン | 用途 |
|------|-----------|------|
| Flutter | 3.41.5 | クロスプラットフォームUI |
| Dart | ^3.10.4 | 開発言語 |

## 状態管理・ルーティング

| 技術 | バージョン | 用途 |
|------|-----------|------|
| flutter_riverpod | ^2.6.1 | 状態管理 |
| go_router | ^17.0.1 | 宣言的ルーティング |

## データベース

| 技術 | バージョン | 用途 |
|------|-----------|------|
| drift | ^2.30.0 | 型安全SQLiteクエリビルダ |
| sqlite3_flutter_libs | ^0.5.32 | SQLiteネイティブライブラリ |

## AI・機械学習

| 技術 | バージョン | 用途 |
|------|-----------|------|
| google_generative_ai | ^0.4.0 | Gemini API (OCR構造化) |
| google_mlkit_text_recognition | ^0.14.0 | オンデバイスOCR |

## 地図・位置情報

| 技術 | バージョン | 用途 |
|------|-----------|------|
| google_maps_flutter | ^2.6.1 | 地図表示 |
| geolocator | ^14.0.0 | GPS位置取得 |
| flutter_foreground_task | ^8.10.0 | バックグラウンドGPS |

## その他

| 技術 | バージョン | 用途 |
|------|-----------|------|
| flutter_blue_plus | ^2.1.1 | Bluetooth (OBD2) |
| purchases_flutter | ^8.0.0 | サブスクリプション (RevenueCat) |
| image_picker | ^1.1.2 | カメラ・ギャラリー |
| flutter_local_notifications | ^20.1.0 | ローカル通知 |

## 開発ツール

| ツール | 用途 |
|--------|------|
| Jujutsu (jj) | バージョン管理 |
| mise | ツールバージョン管理 |
| Lefthook | Git pre-commit フック |
