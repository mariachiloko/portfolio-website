module "site_hosting" {
  source = "../../modules/site-hosting"

  project_name    = var.project_name
  environment     = var.environment
  site_fqdn       = local.site_fqdn
  aliases         = local.site_aliases
  certificate_arn = module.dns.certificate_arn
  tags            = local.common_tags
}

module "dns" {
  source = "../../modules/dns"
  providers = {
    aws           = aws
    aws.us_east_1 = aws.us_east_1
  }

  domain_name             = var.domain_name
  hosted_zone_id          = var.hosted_zone_id
  site_fqdn               = local.site_fqdn
  certificate_domain_name = local.site_fqdn
  tags                    = local.common_tags
}

module "deployment" {
  source = "../../modules/deployment"

  repository_full_name        = var.github_repository
  branch_name                 = var.github_branch
  environment_name            = "production"
  bucket_name                 = module.site_hosting.bucket_name
  private_content_bucket_name = aws_s3_bucket.private_content.bucket
  distribution_id             = module.site_hosting.distribution_id
  oidc_audience               = var.oidc_audience
  github_oidc_thumbprints     = var.github_oidc_thumbprints
  tags                        = local.common_tags
}

resource "aws_route53_record" "site_alias_a" {
  for_each = toset(local.site_aliases)

  zone_id = module.dns.hosted_zone_id
  name    = each.value
  type    = "A"

  alias {
    name                   = module.site_hosting.distribution_domain_name
    zone_id                = module.site_hosting.distribution_hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "site_alias_aaaa" {
  for_each = toset(local.site_aliases)

  zone_id = module.dns.hosted_zone_id
  name    = each.value
  type    = "AAAA"

  alias {
    name                   = module.site_hosting.distribution_domain_name
    zone_id                = module.site_hosting.distribution_hosted_zone_id
    evaluate_target_health = false
  }
}
