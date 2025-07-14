variable "cloudflare_api_token" {
  description = "Cloudflare API Token with permissions to manage resources in the account."
  type        = string
  sensitive   = true
}

variable "cloudflare_account_id" {
  description = "Cloudflare Account ID where resources will be managed."
  type        = string
}
