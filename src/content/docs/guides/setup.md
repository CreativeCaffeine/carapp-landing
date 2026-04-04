---
title: セットアップ
description: carappの開発環境セットアップ手順
---

:::note
このドキュメントはcarappのソースコードから自動生成されています。
:::

## 前提条件

- Flutter SDK 3.41.5+
- Dart SDK ^3.10.4
- Xcode (iOS開発)
- Android Studio (Android開発)
- [mise](https://mise.jdx.dev/) (推奨: ツールバージョン管理)

## セットアップ手順

### 1. リポジトリのクローン

```bash
git clone https://github.com/hijackeboy/carapp.git
cd carapp
```

### 2. ツールのインストール（mise使用時）

```bash
mise install
```

### 3. 依存パッケージの取得

```bash
flutter pub get
```

### 4. コード生成（Drift等）

```bash
dart run build_runner build
```

### 5. 実行

```bash
# iOS
flutter run -d ios

# Android
flutter run -d android
```

## 主要コマンド

| 操作 | コマンド |
|------|---------|
| 依存取得 | `flutter pub get` |
| ビルド (Android) | `flutter build apk` |
| ビルド (iOS) | `flutter build ios` |
| テスト | `flutter test` |
| リント | `dart format --set-exit-if-changed . && dart analyze` |
| コード生成 | `dart run build_runner build` |
