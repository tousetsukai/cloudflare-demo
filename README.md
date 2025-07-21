# Cloudflare Demo

行灯職人への道の新しい構成を試すためのリポジトリ

# 環境構築

## インフラの構築 (初回のみ; 灯雪会アカウントを使う場合は構築済み)

Cloudflare にアクセスし、R2 のアクセストークンおよび Cloudflare D1 の権限があるアクセストークンを取得してください。
Auth0 にアクセスし、Terraform 用のアプリケーションの client ID と client secret を取得してください。

```
cd terraform
cp terraform.tfvars.example terraform.tfvars
$EDITOR terraform.tfvars
cp terraform.tfbackend.example terraform.tfbackend
$EDITOR terraform.tfbackend
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

ローカルの D1 がマイグレーションされる

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

主にドメインとその外側で分かれている。だいたい DDD に乗ってるつもり。

- `/domain`
  - ドメインモデルとビジネスロジック
  - 一番大事なやつ
  - ルール: I/O や外部サービスには依存せず純粋に保つ
  - `/domain/values`
    - いわゆる Value Object
    - ルール: immutable にする
  - `/domain/entities`
    - いわゆるエンティティと集約
    - ルール: id を持ち、id で同一か判断される。mutable。集約されている場合は集約ルートからしか触らないようにする。values にのみ依存
    - 集約にするかどうか: 各エンティティの状態やライフサイクル間の整合性が大事な場合にのみ集約にする
  - `/domain/interfaces`
    - インフラ層のインタフェース
    - ルール: 具体的なサービスには依存しない。values と entities にのみ依存
  - `/domain/usecases`
    - いわゆるアプリケーションサービスとドメインサービスがごっちゃになった層
    - ルール: 複数エンティティにまたがる操作、リポジトリ層を使う操作などをユースケース毎に書く。values と entities と interfaces にのみ依存
- `/infra`
  - DB や外部サービスとのやり取りを行う具体的な実装
  - サービス名ごとにディレクトリを掘っている
  - domain/interfaces を実装する
  - ルール: domain と各サービスや DB の実装に依存
- `/app`
  - HonoX を使用したルーティングとコンポーネントでアプリケーションのエントリポイント
  - (HonoX のデフォルトの名前が app なだけでアプリケーション層を表しているわけではない)
  - ルール
    - Cloudflare Workers で動くという知識を使っていい

本当は `src` ディレクトリを作ってその下に各モジュールを入れたかったが、HonoX のデフォルトが `app` ディレクトリなのでリポジトリ直下に `domain` や `infra` ディレクトリを置くことにしている

# その他

## エンティティの ID について

- ULID を使用する
  - auto_increment は以下の理由により使わない
    - エンティティの生成時に ID が事前に必要
      - DDD 的にはエンティティを作ってから永続化するのが推奨らしい
      - エンティティの作成メソッドにバリデーションなどを含められる
    - Cloudflare D1 はトランザクションをサポートしていないため、sqlite を使って ID を取得しつつそれを insert ということがしにくい (衝突の可能性がある)
    - Durable Object で ID を生成することもできるが、実装コスト・パフォーマンスの観点から避けたい
  - UUIDv4 や CUID2 は以下の理由により使わない
    - 完全ランダムだと DB のパフォーマンスに影響する
    - 例えば画像のメタデータを DB で管理することになった場合、10 万単位のレコード数になりうる
      - 画像を一括アップロードした場合、ミリ秒以内に投入した画像を投入順で取得したいことがあり、その場合 ULID のほうが便利 (ランダム ID でも工夫すれば可能だが、ULID のほうが簡単)
    - どうしてもランダムな値にしたい場合はそこだけ CUID などを使うようにする

## 認証

- Auth0 を使用する
  - が、アプリ側に明示的に Auth0 に依存しているものはなく、環境変数を変えれば他の認証サービスでも動く (OIDC に準拠していれば)
- /dashboard 以下にアクセスするには Auth0 のログインかつ DB へのユーザ情報の登録が必要
  - 未ログインの場合は Auth0 のログインページにリダイレクトする
  - Auth0 ログインページではサインアップも可能
- Auth0 でログインしても DB にユーザが保存されていない場合 (sign up 直後や登録処理で離脱した場合)、ユーザ情報登録ページにリダイレクトする
  - そこで privacy policy や terms of service に同意してもらう
  - username や display_name、卒業期を入力してもらう
- 最低限のユーザー情報 (email, password) 以外は DB 側で管理
