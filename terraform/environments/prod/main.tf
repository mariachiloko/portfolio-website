module "site_hosting" {
  source = "../../modules/site-hosting"

  project_name   = var.project_name
  environment    = var.environment
  domain_name    = var.domain_name
  site_subdomain = var.site_subdomain
  tags           = local.common_tags
}

module "dns" {
  source = "../../modules/dns"

  domain_name             = var.domain_name
  site_fqdn               = local.site_fqdn
  certificate_domain_name = local.site_fqdn
  tags                    = local.common_tags
}

module "deployment" {
  source = "../../modules/deployment"

  repository_full_name = var.github_repository
  branch_name          = var.github_branch
  bucket_name          = module.site_hosting.bucket_name
  distribution_id      = module.site_hosting.distribution_id
  oidc_audience        = var.oidc_audience
  tags                 = local.common_tags
}
