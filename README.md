# Suno Music Prompt Library JP

Suno向け音楽プロンプトとメタデータを管理するWebアプリケーション。ジャンル・ムード・用途ごとにプロンプトを整理し、効率的に音楽制作をサポートします。

## Overview

このプロジェクトは、AI音楽生成サービス「Suno」で使用するプロンプトを体系的に管理するためのフルスタックWebアプリケーションです。プロンプトの作成、検索、フィルタリング、そしてYouTube用メタデータの管理まで、音楽制作ワークフローを一元化します。

### 主な機能

- **プロンプト管理**: Create, Read, Delete操作による完全なCRUD機能
- **高度な検索**: ジャンル、ムード、用途による柔軟なフィルタリング
- **ワンクリックコピー**: プロンプトをクリップボードに即座にコピー
- **YouTube統合**: タイトルと説明文のテンプレート管理
- **型安全性**: TypeScript + Zod によるエンドツーエンドの型安全性
- **テスト済み**: Vitestによる包括的なユニットテスト
- **Docker対応**: コンテナ化された開発・本番環境

## Tech Stack

| カテゴリ | 技術 |
|---------|------|
| **Frontend** | Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS |
| **Backend** | Next.js API Routes, Zod (validation) |
| **Database** | SQLite (dev), PostgreSQL (production), Prisma ORM |
| **Testing** | Vitest, Testing Library |
| **DevOps** | Docker, Docker Compose |

## Domain Model Summary

### MusicPrompt エンティティ

音楽プロンプトを表現する中核エンティティ：

```typescript
{
  id: string              // 一意識別子 (cuid)
  title: string           // プロンプトの名前
  description: string     // 用途や特徴の説明
  mainPrompt: string      // Sunoに入力するプロンプト本文
  genre: string           // 音楽ジャンル (LoFi, EDM, Jazz等)
  bpmRange: string        // BPM範囲 (例: "70-85")
  moodTags: string[]      // ムードタグ (JSON)
  usageTags: string[]     // 用途タグ (JSON)
  youtubeTitleTemplate?: string       // YouTubeタイトル (optional)
  youtubeDescriptionTemplate?: string // YouTube説明文 (optional)
  createdAt: DateTime     // 作成日時
  updatedAt: DateTime     // 更新日時
}
```

### 主な関係性

現在はシンプルな単一エンティティモデルですが、将来的には以下の拡張を想定：
- User → MusicPrompt (所有者関係)
- Tag → MusicPrompt (多対多の正規化されたタグ)
- Collection → MusicPrompt (プロンプトのコレクション)

## Getting Started

### Requirements

- **Node.js** 18以上
- **npm** または **yarn**
- **Docker** と **Docker Compose** (オプション、推奨)

### Setup Steps

#### ローカル開発（SQLite）

1. **リポジトリのクローン**

```bash
git clone https://github.com/goodmonk06/suno-music-prompt-library-jp.git
cd suno-music-prompt-library-jp
```

2. **環境変数の設定**

```bash
cp .env.example .env
```

3. **依存関係のインストール**

```bash
npm install
```

4. **データベースのセットアップ**

```bash
npm run db:migrate
```

5. **サンプルデータの投入**

```bash
npm run db:seed
```

6. **開発サーバーの起動**

```bash
npm run dev
```

→ http://localhost:3000 にアクセス

#### Docker環境（PostgreSQL）

1. **環境変数の設定**

Docker Composeはデフォルトでpostgresを使用します。

2. **コンテナの起動**

```bash
docker compose up -d
```

3. **マイグレーションとシード**

```bash
docker compose exec app npx prisma migrate deploy
docker compose exec app npm run db:seed
```

→ http://localhost:3000 にアクセス

### Available Scripts

| コマンド | 説明 |
|---------|------|
| `npm run dev` | 開発サーバーを起動 (ホットリロード) |
| `npm run build` | プロダクションビルドを作成 |
| `npm run start` | プロダクションサーバーを起動 |
| `npm test` | Vitestでテストを実行 |
| `npm run test:watch` | Vitestをウォッチモードで実行 |
| `npm run test:coverage` | カバレッジレポートを生成 |
| `npm run lint` | ESLintでコードをチェック |
| `npm run typecheck` | TypeScriptの型チェック |
| `npm run db:push` | スキーマをDBに反映 (開発用) |
| `npm run db:migrate` | マイグレーションを作成・適用 |
| `npm run db:seed` | サンプルデータを投入 |
| `npm run db:reset` | DBをリセット (全データ削除) |
| `npm run db:studio` | Prisma Studioを起動 |

## Example Flow

このアプリの垂直スライス（エンドツーエンド動作）を体験できます：

### 1. プロンプトの作成

1. トップページにアクセス → 自動的に `/prompts` にリダイレクト
2. 右上の「新規作成」ボタンをクリック
3. フォームに入力：
   - **タイトル**: "リラックスBGM"
   - **説明**: "カフェでの作業に最適"
   - **メインプロンプト**: "lofi hip hop, chill beats, relaxing"
   - **ジャンル**: "LoFi Hip Hop"
   - **BPM範囲**: "70-85"
   - **ムードタグ**: "リラックス, 集中" (カンマ区切り)
   - **用途タグ**: "作業用BGM, カフェ"
4. 「プロンプトを作成」をクリック → 詳細ページに遷移

**API**: `POST /api/prompts` (Zodバリデーション済み)

### 2. 一覧の表示とフィルタリング

1. `/prompts` で全プロンプトを表示
2. フィルターで絞り込み：
   - **ジャンル**: "LoFi Hip Hop" を選択
   - **ムード**: "リラックス" を選択
3. マッチするプロンプトのみが表示される

**API**: `GET /api/prompts?genre=LoFi Hip Hop&mood=リラックス`

### 3. プロンプトの詳細と使用

1. カードをクリック → `/prompts/[id]` に遷移
2. プロンプト詳細を確認
3. 「コピー」ボタンでクリップボードにコピー
4. Sunoに貼り付けて音楽を生成

**API**: `GET /api/prompts/[id]`

### 4. サンプルデータ

以下の6種類のプロンプトがシードされます：

| ジャンル | 用途 | BPM |
|---------|------|-----|
| LoFi Hip Hop | 作業用BGM、勉強 | 70-85 |
| EDM | ワークアウト、ドライブ | 128-140 |
| Ambient | 瞑想、ヨガ、睡眠 | 40-60 |
| Jazz | カフェBGM、読書 | 100-120 |
| Orchestral | 映像制作、プレゼン | 60-90 |
| Tropical House | ビーチ、夏フェス | 100-115 |

## Project Structure

```
suno-music-prompt-library-jp/
├── app/                      # Next.js App Router
│   ├── api/                  # API Routes
│   │   └── prompts/          # CRUD endpoints
│   ├── prompts/              # UI pages
│   │   ├── page.tsx          # 一覧ページ
│   │   ├── new/              # 新規作成
│   │   └── [id]/             # 詳細ページ
│   ├── layout.tsx            # ルートレイアウト
│   └── globals.css           # グローバルスタイル
├── lib/                      # ユーティリティとロジック
│   ├── prisma.ts             # Prisma client
│   ├── types.ts              # 型定義
│   ├── validations.ts        # Zodスキーマ
│   └── api-utils.ts          # エラーハンドリング
├── prisma/                   # Prisma設定
│   ├── schema.prisma         # データモデル
│   ├── seed.ts               # シードデータ
│   └── migrations/           # マイグレーション履歴
├── test/                     # テストファイル
│   └── setup.ts              # テスト設定
├── docker-compose.yml        # Docker構成
├── Dockerfile                # コンテナイメージ
└── vitest.config.ts          # テスト設定
```

## Testing

### テストの実行

```bash
# すべてのテストを実行
npm test

# ウォッチモード
npm run test:watch

# カバレッジ
npm run test:coverage
```

### テストカバレッジ

- **lib/validations.ts**: プロンプト入力のバリデーションロジック
- **lib/api-utils.ts**: エラーハンドリングとAPIレスポンス

## API Documentation

### エンドポイント

| メソッド | パス | 説明 |
|---------|------|------|
| GET | `/api/prompts` | プロンプト一覧取得 (フィルタ対応) |
| POST | `/api/prompts` | 新規プロンプト作成 |
| GET | `/api/prompts/[id]` | プロンプト詳細取得 |
| PUT | `/api/prompts/[id]` | プロンプト更新 |
| DELETE | `/api/prompts/[id]` | プロンプト削除 |

### クエリパラメータ (GET /api/prompts)

- `genre`: ジャンルでフィルタ
- `mood`: ムードタグでフィルタ
- `usage`: 用途タグでフィルタ

### エラーレスポンス

すべてのAPIは統一されたエラー形式を返します：

```json
{
  "error": "エラーメッセージ",
  "errors": [
    {
      "path": "title",
      "message": "タイトルは必須です"
    }
  ]
}
```

## Future Extensions

### 短期的な拡張

- [ ] **認証**: NextAuth.jsによるユーザー認証
- [ ] **お気に入り**: プロンプトのブックマーク機能
- [ ] **バージョン管理**: プロンプトの履歴追跡
- [ ] **タグ正規化**: タグを独立したエンティティとして管理
- [ ] **エクスポート**: プロンプトのJSON/CSVエクスポート

### 中長期的な拡張

- [ ] **コラボレーション**: チームでのプロンプト共有
- [ ] **AI提案**: プロンプトの自動改善提案
- [ ] **音楽管理**: 生成された音楽ファイルの紐付け
- [ ] **統計**: ジャンル別使用頻度などの分析
- [ ] **マルチプラットフォーム**: Udioなど他のサービス対応

## Contributing

プルリクエストを歓迎します。大きな変更の場合は、まずIssueで議論してください。

## License

MIT

---

**Made with ❤️ for music creators using Suno**
