output "hosted_zone_name" {
  description = "Hosted zone name."
  value       = local.hosted_zone_name
}

output "hosted_zone_id" {
  description = "Hosted zone ID."
  value       = local.hosted_zone_id
}

output "name_servers" {
  description = "Name servers for the hosted zone."
  value       = local.name_servers
}

output "certificate_arn" {
  description = "Validated ACM certificate ARN."
  value       = aws_acm_certificate_validation.site.certificate_arn
}

output "site_fqdn" {
  description = "Public site hostname."
  value       = var.site_fqdn
}
