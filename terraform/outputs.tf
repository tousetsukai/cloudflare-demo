output "d1_database_id" {
  description = "The ID of the D1 database."
  value       = cloudflare_d1_database.main.id
}

output "auth0_client_id" {
  description = "The ID of the Auth0 client."
  value       = auth0_client_credentials.main.client_id
}

output "auth0_client_secret" {
  description = "The secret of the Auth0 client."
  value       = auth0_client_credentials.main.client_secret
  sensitive   = true
}
