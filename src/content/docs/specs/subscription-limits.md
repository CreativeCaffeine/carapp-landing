---
title: サブスクリプション制限値
description: Free / Premium の機能差と各機能でのエンフォース箇所。
sidebar:
  hidden: true
---

## 概要

無料プランと Premium プランの機能差を、**実装で実際にエンフォースされている数値** ベースで整理する。マーケティング表現と実装が乖離していると PR 時に揉めるので、ここを SoT とする。

## 対応コード

- `lib/services/subscription_service.dart`（RevenueCat 連携 / `entitlementId='premium'`）
- `lib/services/ai_usage_service.dart`（OCR の月次使用量カウント）

**最終確認日**: 2026-05-05
**ステータス**: 一部実装済み（OCR は数値で制限。車両台数・データエクスポート・広告非表示は未エンフォース）

## エンフォース済み制限

### AI OCR レシート読み取り（月次）

| プラン | 上限/月 | 出典 |
|-------|--------|------|
| Free | **3 回** | `ai_usage_service.dart:10` (`freeLimit`) |
| Premium | **30 回** | `ai_usage_service.dart:11` (`premiumLimit`) |

- カウントは **月初リセット**
- 上限到達時の挙動: OCR ボタンタップ時に Premium プラン誘導画面（`PlanScreen`）に遷移
- 残り回数は OCR 起動時の overlay にも表示

## 表記上の制限（実装でのエンフォースなし）

ランディング/プラン画面では「車両 1 台 / 無制限」と表記しているが、**コード上は車両追加時の台数チェックなし**。Free プランで 2 台目以降を追加できてしまう状態。

| 機能 | LP/Plan 画面の表記 | 実装 | リスク |
|------|------------------|------|-------|
| 車両登録台数 | Free: 1 台 / Premium: 無制限 | チェックなし（自由に追加可） | 表記詐欺になりかねない |
| データエクスポート（CSV/PDF） | Free: ❌ / Premium: ✅ | エクスポート機能自体が未実装 | LP の記載を一旦下げるべき |
| 統計・グラフ詳細 | Free: 基本 / Premium: 詳細 | 差分なし | 同上 |
| 広告非表示 | Free: 広告あり / Premium: 非表示 | 広告 SDK 未組み込み | 同上 |
| 実績・称号 | Free / Premium 共通 | OK（差なし） | OK |

## RevenueCat 設定

| キー | 値 | 説明 |
|------|---|------|
| entitlement ID | `premium` | RevenueCat 上の単一エンタイトルメント |
| キャッシュキー | `subscription_is_premium` (SharedPreferences) | オフライン時のフォールバック |
| 強制 Premium 化 (debug) | `--dart-define=FORCE_PREMIUM_PURCHASED=true` | 開発時の動作確認用 |
| 強制 Premium 期限 | `--dart-define=FORCE_PREMIUM_EXPIRY=2027-01-01` | 同上 |

API キーは `--dart-define=REVENUECAT_IOS_KEY=...` / `REVENUECAT_ANDROID_KEY=...` で渡す。リポジトリにはコミットしない。

## オープン課題（PO/デザイナー確認事項）

- [ ] **車両台数制限**を実装するか、LP の表記を「将来制限予定」等に変更するか決定する
- [ ] **データエクスポート**を MVP 機能として実装するか、LP から一旦外すか決定する
- [ ] **統計の Premium 限定機能** を具体化する（期間比較・グラフ種類など）
- [ ] **広告非表示** の前提となる広告組み込み計画を決定する（そもそも広告表示するのか？）
- [ ] OCR 月上限のリセット日時（月初 = ローカル 00:00 か UTC か）の挙動確認

## 関連 guide

- [/guide/subscription](/carapp-landing/guide/subscription/)
- [/guide/ocr](/carapp-landing/guide/ocr/)
