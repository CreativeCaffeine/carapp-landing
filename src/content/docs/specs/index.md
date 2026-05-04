---
title: 内部仕様書（PO・デザイナー向け）
description: ユーザー向け guide には載せない実装仕様・閾値・エラーフローを集約する。
sidebar:
  hidden: true
---

import { Aside } from '@astrojs/starlight/components';

:::caution[このセクションは内部向け]
ここは **PO・デザイナー・QA・エンジニア間ですり合わせるための内部仕様書** です。エンドユーザー向けの説明は [機能ガイド](/carapp-landing/guide/) を参照してください。
- sidebar / 検索からは隠していますが、URL を知っていれば誰でも閲覧できます（**機微な数値は載せない**）
- 数値・閾値は **コードが正**。ここの値は実装変更時に更新されないことがあるので、迷ったら lib/services 配下を確認してください
- 各仕様書は対応する `lib/...` ファイルへのリンクを冒頭に明記してください
:::

## 仕様書一覧

| ドキュメント | 担当領域 | 主な情報源 |
|------------|---------|-----------|
| [通知マトリクス](/carapp-landing/specs/notification-matrix/) | リマインダー通知 / ドライブ通知の発火条件・タイミング・文言 | `lib/services/notification_service.dart` |
| [サブスクリプション制限値](/carapp-landing/specs/subscription-limits/) | Free / Premium の機能差・実数値・エンフォース箇所 | `lib/services/subscription_service.dart` / `ai_usage_service.dart` |

## 今後追加すべき仕様書（未着手）

- **auto-record-thresholds**: GPS 自動記録の速度・確認回数・cooldown
- **reminder-timing**: 走行距離ベース・日付ベースのリマインダーチェックタイミング
- **error-empty-states**: 各画面の空状態・権限拒否・OCR 失敗時のフロー
- **screen-transitions**: 画面遷移マップ（特にモーダル / シート / スワイプバック）
- **drive-scoring**: ドライブスコアの算出式と各パラメータの重み

## ドキュメントの書式

新規仕様書を作るときは [`_template.md`](https://github.com/CreativeCaffeine/carapp-landing/blob/main/src/content/docs/specs/_template.md) をコピーしてください（リポジトリ上で参照、ビルドからは除外されています）。

各仕様書は冒頭に以下のメタ情報を入れます:

- **対応コード**: `lib/services/xxx.dart` への直リンク
- **最終確認日**: 数値が実装と整合しているか確認した日付
- **ステータス**: 実装済み / 設計中 / 削除予定 のいずれか
