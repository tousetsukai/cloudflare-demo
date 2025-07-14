terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 5"
    }
    auth0 = {
      source  = "auth0/auth0"
      version = "~> 1"
    }
  }
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

provider "auth0" {
  domain        = "satsukita-andon.jp.auth0.com"
  client_id     = var.auth0_client_id
  client_secret = var.auth0_client_secret
}
