output "bucket_name" {
  description = "Placeholder bucket name contract."
  value       = "${local.name_prefix}-site"
}

output "bucket_arn" {
  description = "Placeholder bucket ARN contract."
  value       = "arn:aws:s3:::${local.name_prefix}-site"
}

output "distribution_id" {
  description = "Placeholder CloudFront distribution ID contract."
  value       = "${local.name_prefix}-distribution"
}

output "distribution_domain_name" {
  description = "Placeholder CloudFront domain name contract."
  value       = "${local.name_prefix}.cloudfront.net"
}

output "origin_access_control_id" {
  description = "Placeholder OAC identifier contract."
  value       = "${local.name_prefix}-oac"
}

output "site_fqdn" {
  description = "Fully qualified site domain."
  value       = local.site_fqdn
}
