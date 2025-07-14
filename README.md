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
