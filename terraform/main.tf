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
