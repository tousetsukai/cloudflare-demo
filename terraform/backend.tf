# https://developers.cloudflare.com/terraform/advanced-topics/remote-backend/
# https://qiita.com/yDog/items/d18a473a1e5b69cc8127
terraform {
  backend "s3" { # r2
    # created by `bunx wrangler r2 bucket create tousetsukai-tfstates`
    bucket                      = "tousetsukai-tfstates"
    key                         = "cloudflare-demo/terraform.tfstate"
    region                      = "auto"
    skip_credentials_validation = true
    skip_metadata_api_check     = true
    skip_region_validation      = true
    skip_requesting_account_id  = true
    skip_s3_checksum            = true
    use_path_style              = true
    use_lockfile                = true
  }
}
