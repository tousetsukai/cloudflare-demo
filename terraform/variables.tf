variable "cloudflare_api_token" {
  description = "Cloudflare API Token with permissions to manage resources in the account."
  type        = string
  sensitive   = true
}

variable "cloudflare_account_id" {
  description = "Cloudflare Account ID where resources will be managed."
  type        = string
}

variable "auth0_domain" {
  description = "Auth0 Domain for the application."
  type        = string
  default     = "satsukita-andon.jp.auth0.com"
}

variable "auth0_client_id" {
  description = "Auth0 Client ID for Terraform."
  type        = string
}

variable "auth0_client_secret" {
  description = "Auth0 Client Secret for Terraform."
  type        = string
  sensitive   = true
}
