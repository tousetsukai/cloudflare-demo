#
# Cloudflare
#

locals {
  script_name = "cloudflare-demo"
}

resource "cloudflare_d1_database" "main" {
  account_id = var.cloudflare_account_id
  name       = "cloudflare-demo"

  lifecycle {
    prevent_destroy = true
  }
}

resource "random_password" "oidc_auth_secret" {
  length = 32
}

resource "cloudflare_workers_secret" "oidc_auth_secret" {
  account_id  = var.cloudflare_account_id
  script_name = local.script_name
  name        = "OIDC_AUTH_SECRET"
  secret_text = random_password.oidc_auth_secret.result
}

resource "cloudflare_workers_secret" "oidc_issuer" {
  account_id  = var.cloudflare_account_id
  script_name = local.script_name
  name        = "OIDC_ISSUER"
  secret_text = "https://${var.auth0_domain}"
}

resource "cloudflare_workers_secret" "oidc_client_id" {
  account_id  = var.cloudflare_account_id
  script_name = local.script_name
  name        = "OIDC_CLIENT_ID"
  secret_text = auth0_client.main.client_id
}

resource "cloudflare_workers_secret" "oidc_client_secret" {
  account_id  = var.cloudflare_account_id
  script_name = local.script_name
  name        = "OIDC_CLIENT_SECRET"
  secret_text = auth0_client_credentials.main.client_secret
}

# import {
#   id = "${var.cloudflare_account_id}/cloudflare-demo"
#   to = cloudflare_workers_script.main
# }

#
# Auth0
#

locals {
  origins = [
    "https://cloudflare-demo.tousetsukai.workers.dev",
    "http://localhost:8787",
    "http://localhost:5173"
  ]
}

resource "auth0_client" "main" {
  name                = "Cloudflare Demo"
  app_type            = "regular_web"
  callbacks           = [for o in local.origins : "${o}/callback"]
  allowed_origins     = local.origins
  allowed_logout_urls = local.origins
}

resource "auth0_client_credentials" "main" {
  client_id             = auth0_client.main.id
  authentication_method = "client_secret_post"
}
