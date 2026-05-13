variable "domain_name" {
  description = "Primary domain name for the hosted zone."
  type        = string
}

variable "hosted_zone_id" {
  description = "Optional existing hosted zone ID to use instead of creating a new zone."
  type        = string
  default     = null
}

variable "site_fqdn" {
  description = "Fully qualified domain name for the public site."
  type        = string
}

variable "certificate_domain_name" {
  description = "Domain name requested for the ACM certificate."
  type        = string
}

variable "tags" {
  description = "Tags applied to future DNS resources."
  type        = map(string)
  default     = {}
}
