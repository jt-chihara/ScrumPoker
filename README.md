# スクラムポーカー

オンラインでプランニングポーカーを実施するWebアプリケーション

## 概要

スクラムチームが作業規模を見積もるためのプランニングポーカーツールです。参加者全員の見解を効率的にまとめることができ、リアルタイムで投票・結果表示が可能です。

## 主な機能

- **ルーム管理**: ルーム作成・参加機能
- **リアルタイム投票**: WebSocketによる同期投票
- **フィボナッチ数列カード**: 0, 1, 2, 3, 5, 8, 13, 21, ? のカードで投票
- **結果表示**: 投票結果と統計情報（平均値、最高値、最低値）の表示
- **レスポンシブデザイン**: モバイル・デスクトップ対応

## 技術スタック

### フロントエンド
- **React 19.1.1**: ユーザーインターフェース
- **Next.js 15.4.5**: フルスタックフレームワーク（App Router）
- **TypeScript 5.8.3**: 型安全性
- **Tailwind CSS 3.4.17**: スタイリング
- **Socket.IO Client 4.8.1**: リアルタイム通信

### バックエンド
- **Next.js API Routes**: サーバーサイドAPI
- **Socket.IO 4.8.1**: WebSocketサーバー
- **Custom Server**: Socket.IO統合

### 開発ツール
- **Biome**: リンティング・フォーマッティング
- **tsx**: TypeScript実行環境

## プロジェクト構成

```
/
├── app/                     # Next.js App Router
│   ├── globals.css         # Tailwind CSS
│   ├── layout.tsx          # ルートレイアウト
│   ├── page.tsx            # ホームページ（ルーム作成・参加）
│   └── room/[id]/          # 動的ルーティング
│       └── page.tsx        # プランニングポーカーページ
├── components/             # 再利用可能コンポーネント
│   ├── PokerCard.tsx      # 投票カードコンポーネント
│   └── UserList.tsx       # 参加者リスト・統計表示
├── lib/                   # ユーティリティ
│   └── socket.ts          # Socket.IOサーバー設定
├── server.ts              # カスタムサーバー（Socket.IO統合）
└── 設定ファイル群
```

## 開発環境のセットアップ

### 前提条件
- Node.js 18以上
- npm

### インストール

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev
```

ブラウザで http://localhost:3000 にアクセス

### 利用可能なコマンド

```bash
# 開発サーバー起動（Socket.IO統合）
npm run dev

# プロダクションビルド
npm run build

# プロダクション実行
npm run start

# コード検証（Biome）
npm run lint

# 自動修正
npm run lint:fix

# フォーマット
npm run format
```

## 使用方法

### 1. ルーム作成
1. トップページで名前を入力
2. 「新しいルームを作成」をクリック
3. 生成されたルームIDを他の参加者に共有

### 2. ルーム参加
1. トップページで名前とルームIDを入力
2. 「ルームに参加」をクリック

### 3. 投票
1. 見積もり対象について議論
2. 各参加者がカードを選択
3. 全員が投票完了後、「結果を表示」をクリック
4. 必要に応じて「リセット」で再投票

## 設定・カスタマイズ

### 環境変数
- `NODE_ENV`: 実行環境（development/production）
- `NEXT_PUBLIC_SOCKET_URL`: Socket.IOサーバーURL（デフォルト: http://localhost:3000）

### カードの値をカスタマイズ
`app/room/[id]/page.tsx`の`CARD_VALUES`配列を編集：

```typescript
const CARD_VALUES = ['0', '1', '2', '3', '5', '8', '13', '21', '?']
```

## アーキテクチャ

### リアルタイム通信
- **WebSocket**: Socket.IOによる双方向通信
- **イベント駆動**: 投票、結果表示、ユーザー管理
- **ルーム管理**: メモリベースのセッション管理

## トラブルシューティング

### よくある問題

**ポート競合エラー**
```bash
lsof -ti:3000 | xargs kill -9
```

**Tailwind CSSが効かない**
```bash
rm -rf .next
npm run dev
```

**TypeScriptエラー**
```bash
npx tsc --noEmit
```

## ライセンス

MIT License
