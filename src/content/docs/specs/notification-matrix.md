---
title: 通知マトリクス
description: アプリ内で発火する通知の条件・タイミング・文言の一覧。
sidebar:
  hidden: true
---

## 概要

アプリ内で発火する **ローカル通知** の一覧。リマインダー（メンテナンス時期）・ドライブ自動記録のフォアグラウンド通知・GPS 検知通知を網羅する。サーバー push 通知は現在未使用。

## 対応コード

- `lib/services/notification_service.dart`（チャネル・通知 ID・文言）
- `lib/services/drive_detection_service.dart`（GPS 自動記録の通知）
- `lib/services/ibeacon_monitor_service.dart` / `bluetooth_monitor_service.dart`（自動記録の発火元）

**最終確認日**: 2026-05-05
**ステータス**: 実装済み（ただし scheduled notification は未対応、後述の制約参照）

## 通知チャネル

| チャネル ID | 名称 | 説明 | プラットフォーム |
|-----------|------|-----|---------------|
| `carapp_reminders` | メンテナンスリマインダー | オイル交換・車検などのリマインダー通知 | Android |
| `gps_drive_category` | （iOS カテゴリ） | ドライブ中通知。アクション「終了する」「続行する」を含む | iOS |

## メンテナンスリマインダー（汎用）

`showMaintenanceReminder()` で発火する。

| type | アイコン | タイトル | 本文の例 |
|------|--------|---------|---------|
| `oil` | 🛢️ | オイル交換のお知らせ ($vehicleName) | 次回交換まで 500km |
| `tire` | 🔄 | タイヤ交換のお知らせ ($vehicleName) | 次回交換まで 30日 |
| `battery` | 🔋 | バッテリー交換のお知らせ ($vehicleName) | （任意の detail） |
| `inspection` | 🔍 | 定期点検のお知らせ ($vehicleName) | （任意の detail） |
| `aircon` | ❄️ | エアコンフィルター交換のお知らせ ($vehicleName) | （任意の detail） |
| `shaken` | 📋 | 車検のお知らせ ($vehicleName) | （任意の detail） |
| `custom` | 🔧 | メンテナンスのお知らせ ($vehicleName) | （任意の detail） |

## レガシー通知（個別 API）

| 関数 | 通知 ID | タイトル | 本文 |
|------|---------|---------|------|
| `showOilChangeReminder` | 100 | オイル交換の時期です | 前回から ${kmSinceChange}km 走行しました。交換を検討してください。 |
| `showInspectionReminder` (期限切れ) | 101 | 車検リマインダー | 車検期限が切れています。早急に更新してください。 |
| `showInspectionReminder` (期限内) | 101 | 車検リマインダー | 車検まであと ${remainingDays}日です。予約を忘れずに。 |
| `showFuelReminder` | 102 | 燃料補給のお知らせ | 燃料残量を確認してください。 |
| `showMaintenanceReminderLegacy` | 103 | メンテナンスの時期です | $item の点検・交換を検討してください。 |

汎用版（`showMaintenanceReminder`）は通知 ID `200` から動的にインクリメントする。

## ドライブ自動記録通知（iOS）

`drive_detection_service.dart` 内で発火。`gps_drive_category` カテゴリで以下の 2 アクション付き:

- 「終了する」（foreground）
- 「続行する」（destructive）

## トリガーマトリクス（理想 vs 現状）

| 通知種別 | 想定トリガー | 現在の発火タイミング | ギャップ |
|---------|------------|---------------------|---------|
| オイル交換 | 期限到来時に自動 | アプリ起動時 / 該当画面表示時 | **scheduled push 未実装** |
| 車検 | 期限 30 日前 / 期限当日 | 同上 | 同上 |
| タイヤ交換 | 期限到来時 | 同上 | 同上 |
| 任意保険更新 | 期限 30 日前 | 未実装 | 通知メソッドそのものが無い |
| 自動車税納付 | 5 月初旬 | 未実装 | 通知メソッドそのものが無い |
| ドライブ自動検知 | 速度閾値超え時 | リアルタイム | OK |

## 既知の制約

- **scheduled / zonedSchedule は未実装**: `notification_service.dart:147` のコメント参照。`tz` パッケージが pubspec に未追加なため、現状は「アプリ起動時に reminder レコードを参照して show() する」ポーリング方式。これにより:
  - **アプリを起動しないと通知が来ない**（ユーザー視点で大きな弱点）
  - 「車検 30 日前ピッタリ」のような正確なタイミング指定ができない
- 通知の **再通知** ロジックも未実装（一度 dismiss されると同じ条件では再表示されない）

## オープン課題

- [ ] `tz` パッケージ追加 + `zonedSchedule` 実装
- [ ] 任意保険・自動車税の通知メソッド追加
- [ ] 通知文言の i18n 対応（英語）
- [ ] 通知タップ時の deep link（該当リマインダー詳細を開く）

## 関連 guide

- [/guide/reminders](/carapp-landing/guide/reminders/)
- [/guide/auto-record](/carapp-landing/guide/auto-record/)
