locals {
  site_fqdn = "${var.site_subdomain}.${var.domain_name}"
  site_aliases = distinct([
    var.domain_name,
    local.site_fqdn,
  ])

  common_tags = merge(
    {
      Project     = var.project_name
      Environment = var.environment
      ManagedBy   = "Terraform"
    },
    var.tags,
  )
}
