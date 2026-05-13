locals {
  site_fqdn                   = "${var.site_subdomain}.${var.domain_name}"
  name_prefix                 = lower(replace("${var.project_name}-${var.environment}-${data.aws_caller_identity.current.account_id}", "_", "-"))
  private_content_bucket_name = "${local.name_prefix}-content"
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
