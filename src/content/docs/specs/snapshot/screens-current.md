---
title: "現状スナップショット: 画面一覧"
description: "carapp 実装の全画面マップ (コード起点・2026-06 時点)"
---

> 本ページは **コードが正、ドキュメントは追従** の原則に基づき、`lib/screens/` 配下の実装から逆引きで生成したスナップショットです。
> Figma v2 (「My Car App」) リデザインが進行中で、画面ごとに着手状況が異なります。**Figma v2 適用前の現状** を凍結した参照点として扱ってください。
>
> **最終確認日**: 2026-06-06
> **対応ブランチ**: `feat/figma-home-screen`

## ShellRoute と画面分類

`lib/main.dart` の `_router` で `ShellRoute` 配下に 4 タブと `/drive-result/:sessionId` を配置し、それ以外の遷移先 (詳細・編集・全画面ダイアログ的画面) は ShellRoute の外に `GoRoute` を定義する構造。

- ShellRoute 内のタブ画面は `_fadePage()` (FadeTransition)。
- ShellRoute 外のページは `_slidePage()` (CupertinoPage = 指追従スワイプバック)。
- 中央 + ボタン (FAB) は `MainScaffold._showQuickAddMenu()` から `PageRouteBuilder` 経由で `QuickAddMenu` を fade で被せる。

## タブ画面 (ShellRoute 内)

| 画面 | ファイル | パス | 遷移種類 | 主要 Provider | 主要遷移先 | Figma v2 状況 |
|------|---------|------|---------|--------------|-----------|---------------|
| ホーム | `lib/screens/home_screen.dart` | `/` | fade | `activeVehicleProvider`, `recentLogsProvider` | QuickAddMenu, 各 record form, `/vehicles` | **v2 反映済** (`feat/figma-home-screen`) |
| ログ | `lib/screens/logs_screen.dart` | `/logs` | fade | `logsProvider` | `/log/:logId`, record form | 未着手 |
| 統計 | `lib/screens/cumulative_summary_screen.dart` | `/stats?tab=N` | fade | `summaryProvider`, `expenseRatioProvider` | `tax/*` | 未着手 |
| 設定 | `lib/screens/settings_screen.dart` | `/settings` | fade | `settingsProvider` | `settings/*`, `notifications/*` | 未着手 |

## ドライブ系画面

| 画面 | ファイル | パス | 遷移種類 | 主要 Provider | 主要遷移先 | Figma v2 状況 |
|------|---------|------|---------|--------------|-----------|---------------|
| ドライブ中 | `lib/screens/driving_screen.dart` | `/driving` | slide | `driveProvider`, `isDrivingProvider` | `/drive-result/:id` | 全面刷新中 |
| ドライブ結果 | `lib/screens/drive_result_screen.dart` | `/drive-result/:sessionId` | slide (ShellRoute 内) | `driveSessionProvider` | `/drive-detail/:id`, `/drive-edit` | 全面刷新中 |
| ドライブ詳細 | `lib/screens/drive_detail_screen.dart` | `/drive-detail/:sessionId` | slide | `driveSessionProvider` | `/drive-edit`, `/expanded-map/:id` | 未着手 |
| ドライブ編集 | `lib/screens/drive_edit_screen.dart` | `/drive-edit` (extra: DriveSession) | slide | `driveSessionProvider` | pop | 未着手 |
| 拡大マップ | `lib/screens/expanded_map_screen.dart` | `/expanded-map/:sessionId` | fade | `driveLocationsProvider` | pop | 未着手 |
| ドライブの思い出 (旧「愛車ログ」) | `lib/screens/drive_memories_screen.dart` | `/memories` | slide | `driveSessionsProvider` | `/drive-detail/:id` | **Issue #231 で廃止予定** |
| ドライブ手動記録 | `lib/screens/drive_record_screen.dart` | (modal) | - | `driveProvider` | pop | 未着手 |

## 記録系画面

| 画面 | ファイル | パス | 遷移種類 | 主要 Provider | 主要遷移先 | Figma v2 状況 |
|------|---------|------|---------|--------------|-----------|---------------|
| 汎用記録フォーム | `lib/screens/generic_record_form_screen.dart` | (push) | slide | `activeVehicleProvider`, `databaseProvider` | pop | 部分対応 (Issue #229/230 で再構成) |
| ログ詳細 | `lib/screens/log_detail_screen.dart` | `/log/:logId` | slide | `logProvider` | edit form | 未着手 |

QuickAddMenu (`lib/widgets/quick_add_menu.dart`) からは `RecordCategories.all` で定義された 7 カテゴリへ展開する (詳細は navigation-current 参照)。

## 設定系画面 (ShellRoute 外、settings から push)

| 画面 | ファイル | 遷移種類 |
|------|---------|---------|
| プラン | `lib/screens/settings/plan_screen.dart` | slide |
| データバックアップ | `lib/screens/settings/data_backup_screen.dart` | slide |
| プライバシー | `lib/screens/settings/privacy_screen.dart` | slide |
| ドライブ記録設定 | `lib/screens/settings/drive_record_settings_screen.dart` | slide |
| リマインダー設定 | `lib/screens/settings/reminder_settings_screen.dart` | slide |
| アバウト | `lib/screens/settings/about_screen.dart` | slide |

## 税務系画面

| 画面 | ファイル |
|------|---------|
| 経費按分 一覧 | `lib/screens/tax/expense_ratio_list_screen.dart` |
| 経費按分 詳細 | `lib/screens/tax/expense_ratio_detail_screen.dart` |
| 経費レポート 一覧 | `lib/screens/tax/expense_report_list_screen.dart` |
| 経費レポート 詳細 | `lib/screens/tax/expense_report_detail_screen.dart` |

## リマインダー系画面

| 画面 | ファイル |
|------|---------|
| リマインダー詳細 | `lib/screens/reminders/reminder_detail_screen.dart` |
| リマインダー項目選択 | `lib/screens/reminders/reminder_item_selection_screen.dart` |
| カスタムリマインダー | `lib/screens/reminders/custom_reminder_screen.dart` |

## 通知系画面

| 画面 | ファイル |
|------|---------|
| 通知設定 | `lib/screens/notifications/notification_settings_screen.dart` |
| 重要なお知らせ | `lib/screens/notifications/important_notices_screen.dart` |
| ドライブ通知 | `lib/screens/notifications/driving_notifications_screen.dart` |
| コストアラート | `lib/screens/notifications/cost_alert_screen.dart` |
| レポート通知 | `lib/screens/notifications/report_notifications_screen.dart` |

## オンボーディング・その他

| 画面 | ファイル | 用途 |
|------|---------|------|
| オンボーディング | `lib/screens/onboarding_screen.dart` | 初回起動時の車両登録 |
| 車両管理 | `lib/screens/vehicle_management_screen.dart` | `/vehicles` slide。アクティブ車両切替・編集・追加 |

## Figma v2 適用状況サマリ

| ステータス | 画面 |
|-----------|------|
| **v2 反映済** | ホーム (`home_screen.dart`) |
| **全面刷新中** | ドライブ中・ドライブ結果 |
| **未着手** | 上記以外すべて |

刷新計画は別途 Figma 仕様書を参照。Issue #227-231 適用後の影響は [Issue #227-231 適用後の差分設計](/carapp-landing/specs/diff/after-issues-227-231/) を参照。
