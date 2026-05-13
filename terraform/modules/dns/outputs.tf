output "hosted_zone_name" {
  description = "Hosted zone name contract."
  value       = var.domain_name
}

output "certificate_domain_name" {
  description = "Requested ACM certificate domain contract."
  value       = var.certificate_domain_name
}

output "site_fqdn" {
  description = "Public site hostname contract."
  value       = var.site_fqdn
}
