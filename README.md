# Cloudflare Demo

行灯職人への道の新しい構成を試すためのリポジトリ

## インフラの構築 (初回のみ)

Cloudflare にアクセスし、R2 のアクセストークンおよび Cloudflare D1 の権限があるアクセストークンを取得してください。
Auth0 にアクセスし、Terraform 用のアプリケーションの client ID と client secret を取得してください。

```
cd terraform
cp terraform.tfvars.example terraform.tfvars
cp terraform.tfbackend.example terraform.tfbackend
$EDITOR terraform.tfvars
terraform init
terraform plan
terraform apply
```

## ローカル開発

`terraform output` で出力された値を `.dev.vars` に設定します。
OIDC_AUTH_SECRET はランダムな値を生成します。

```
cp .dev.vars.example .dev.vars
$EDITOR .dev.vars
bun i
bun run dev
# => localhost:5173
bun run build
bun run preview
# => localhost:8787
```

## DB マイグレーション

```
bun run db:generate
bun run db:apply
```

## デプロイ

```
bun run build
bun run deploy
```

# プロジェクトの構成

- `/domain`
  - ドメインモデルとビジネスロジック
  - 一番大事なやつ
  - ルール
    - I/O や外部サービスには依存せず純粋に保つ
- `/app`
  - HonoX を使用したルーティングとコンポーネント
  - (HonoX のデフォルトの名前が app なだけでアプリケーション層を表しているわけではない)
  - ルール
    - Cloudflare Workers で動くという知識を使っていい
- `/adapters`
  - DB や外部サービスとのやり取りを行う具体的な実装

本当は `src` ディレクトリを作ってその下に入れたかったが、HonoX のデフォルトが `app` ディレクトリなのでリポジトリ直下に `domain` や `infra` ディレクトリを置くことにしている

# 設計

## ID

- ULID を使用する
  - auto_increment は以下の理由により使わない
    - エンティティの生成時に ID が事前に必要
    - Cloudflare D1 はトランザクションをサポートしていないため、sqlite を使って ID を取得しつつそれを insert ということがしにくい (衝突の可能性がある)
    - Durable Object で ID を生成することもできるが、実装コスト・パフォーマンスの観点から避けたい
  - UUIDv4 や CUID2 は以下の理由により使わない
    - 完全ランダムだと DB のパフォーマンスに影響する
    - 例えば画像のメタデータを DB で管理することになった場合、10 万単位のレコード数になりうる
      - 画像を一括アップロードした場合、ミリ秒以内に投入した画像を投入順で取得したいことがあり、その場合 ULID のほうが便利 (ランダム ID でも工夫すれば可能だが、ULID のほうが簡単)

## 認証

- Auth0 を使用する
- /dashboard 以下にアクセスするには Auth0 のログインかつ DB へのユーザ情報の登録が必要
  - 未ログインの場合は Auth0 のログインページにリダイレクトする
  - Auth0 ログインページではサインアップも可能
- Auth0 でログインしても DB にユーザが保存されていない場合 (sign up 直後や登録処理で離脱した場合)、ユーザ情報登録ページにリダイレクトする
  - そこで privacy policy や terms of service に同意してもらう
  - username や display_name、卒業期を入力してもらう
- 最低限のユーザー情報 (email, password) 以外は DB 側で管理
