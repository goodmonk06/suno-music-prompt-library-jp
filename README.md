# suno-music-prompt-library-jp

Suno向け音楽プロンプトとメタデータを管理するWebアプリケーション。ジャンル・ムード・用途ごとのプリセットを簡単に管理・検索できます。

## 機能

- 音楽プロンプトの作成・閲覧・削除
- ジャンル、ムード、用途によるフィルタリング
- プロンプトのワンクリックコピー
- YouTube用タイトル・説明文テンプレート対応
- レスポンシブデザイン

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: SQLite (Prisma ORM)

## Getting Started

### 前提条件

- Node.js 18以上
- npm または yarn

### セットアップ

1. リポジトリのクローン

```bash
git clone https://github.com/yourusername/suno-music-prompt-library-jp.git
cd suno-music-prompt-library-jp
```

2. 依存関係のインストール

```bash
npm install
```

3. データベースのセットアップ

```bash
npx prisma migrate dev
```

4. サンプルデータの投入（オプション）

```bash
npm run seed
```

5. 開発サーバーの起動

```bash
npm run dev
```

http://localhost:3000 にアクセスしてアプリケーションを確認できます。

## 使い方

### プロンプトの作成

1. 画面右上の「新規作成」ボタンをクリック
2. フォームに必要な情報を入力
   - タイトル: プロンプトの名前
   - 説明: プロンプトの用途や特徴
   - メインプロンプト: Sunoに入力するプロンプト本文
   - ジャンル: 音楽のジャンル（例: LoFi Hip Hop）
   - BPM範囲: テンポの範囲（例: 70-85）
   - ムードタグ: カンマ区切りで雰囲気を表すタグ
   - 用途タグ: カンマ区切りで用途を表すタグ
   - （オプション）YouTubeテンプレート
3. 「プロンプトを作成」ボタンをクリック

### プロンプトの検索・フィルタリング

一覧ページでジャンル、ムード、用途によるフィルタリングが可能です。

### プロンプトの使用

詳細ページで「コピー」ボタンをクリックすると、プロンプトをクリップボードにコピーできます。

## サンプルプロンプト

### 深夜の集中作業用 LoFi Hip Hop

**ジャンル**: LoFi Hip Hop
**BPM範囲**: 70-85
**ムード**: リラックス、落ち着き、ノスタルジック、集中
**用途**: 作業用BGM、勉強、読書、深夜作業、カフェ

**プロンプト**:
```
lofi hip hop, chill beats, ambient jazz, relaxing piano melodies, vinyl crackle, warm bass, soft drums,
atmospheric pads, nostalgic vibes, study music, late night mood, downtempo groove,
subtle saxophone, Rhodes electric piano, gentle guitar plucks, rain sounds in background
```

このプロンプトは深夜の作業や勉強に最適なLoFi Hip Hopを生成します。リラックスした雰囲気とノスタルジックな音色が特徴です。

## データモデル

### MusicPrompt

| フィールド | 型 | 説明 |
|-----------|------|------|
| id | String | 一意識別子 |
| title | String | プロンプトのタイトル |
| description | String | プロンプトの説明 |
| mainPrompt | String | メインプロンプト本文 |
| genre | String | 音楽ジャンル |
| bpmRange | String | BPM範囲 |
| moodTags | String[] | ムードタグ（JSON） |
| usageTags | String[] | 用途タグ（JSON） |
| youtubeTitleTemplate | String? | YouTubeタイトルテンプレート |
| youtubeDescriptionTemplate | String? | YouTube説明文テンプレート |
| createdAt | DateTime | 作成日時 |
| updatedAt | DateTime | 更新日時 |

## スクリプト

```bash
npm run dev      # 開発サーバーの起動
npm run build    # プロダクションビルド
npm run start    # プロダクションサーバーの起動
npm run seed     # サンプルデータの投入
```

## License

MIT
