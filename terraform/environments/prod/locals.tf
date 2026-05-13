locals {
  site_fqdn = "${var.site_subdomain}.${var.domain_name}"

  common_tags = merge(
    {
      Project     = var.project_name
      Environment = var.environment
      ManagedBy   = "Terraform"
    },
    var.tags,
  )
}
