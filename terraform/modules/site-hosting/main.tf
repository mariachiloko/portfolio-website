locals {
  name_prefix = lower(replace("${var.project_name}-${var.environment}", "_", "-"))
  site_fqdn   = "${var.site_subdomain}.${var.domain_name}"
}

# Phase 4 will replace these placeholder contracts with real AWS resources.
