output "site_url" {
  description = "Public URL for the site."
  value       = "https://${local.site_fqdn}"
}

output "bucket_name" {
  description = "Name of the private origin bucket."
  value       = module.site_hosting.bucket_name
}

output "distribution_domain_name" {
  description = "CloudFront domain name placeholder."
  value       = module.site_hosting.distribution_domain_name
}

output "deployment_role_name" {
  description = "IAM role name placeholder for GitHub Actions."
  value       = module.deployment.role_name
}
