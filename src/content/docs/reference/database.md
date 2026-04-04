---
title: データベース
description: carappのデータベーススキーマ
---

:::note
このドキュメントはcarappのソースコードから自動生成されています。
:::

## テーブル一覧

| テーブル | 説明 |
|---------|------|
| `vehicles` | 車両情報 |
| `logs` | 記録（給油・メンテナンス・車検・税金・洗車等） |
| `log_media` | 記録に紐づく画像・ファイル |
| `drive_sessions` | ドライブセッション |
| `drive_locations` | ドライブ中のGPS位置情報 |
| `drive_media` | ドライブ中の写真・メモ |
| `appraisals` | 車両査定情報 |
| `achievements` | 実績定義 |
| `user_achievements` | ユーザーの実績達成状況 |
| `titles` | 称号定義 |
| `custom_subcategories` | ユーザー定義サブカテゴリ |

## ER概要

```
vehicles 1──* logs
vehicles 1──* drive_sessions
logs     1──* log_media
drive_sessions 1──* drive_locations
drive_sessions 1──* drive_media
achievements   1──* user_achievements
```
