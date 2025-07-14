#
# Cloudflare
#

resource "cloudflare_d1_database" "main" {
  account_id            = var.cloudflare_account_id
  name                  = "cloudflare-demo"
  primary_location_hint = "apac"
  read_replication = {
    mode = "disabled"
  }

  lifecycle {
    prevent_destroy = true
  }
}

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
