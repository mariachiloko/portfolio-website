output "site_url" {
  description = "Public URL for the site."
  value       = "https://${local.site_fqdn}"
}

output "bucket_name" {
  description = "Name of the private origin bucket."
  value       = module.site_hosting.bucket_name
}

output "private_content_bucket_name" {
  description = "Name of the private content source bucket."
  value       = aws_s3_bucket.private_content.bucket
}

output "distribution_domain_name" {
  description = "CloudFront domain name for the site."
  value       = module.site_hosting.distribution_domain_name
}

output "dns_zone_name_servers" {
  description = "Name servers for the Route 53 hosted zone."
  value       = module.dns.name_servers
}

output "certificate_arn" {
  description = "Validated ACM certificate ARN."
  value       = module.dns.certificate_arn
}

output "deployment_role_arn" {
  description = "IAM role ARN for GitHub Actions deployments."
  value       = module.deployment.role_arn
}
