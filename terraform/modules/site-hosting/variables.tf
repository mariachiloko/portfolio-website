variable "project_name" {
  description = "Short project identifier used for naming."
  type        = string
}

variable "environment" {
  description = "Environment name for this module call."
  type        = string
}

variable "domain_name" {
  description = "Primary domain used by the public site."
  type        = string
}

variable "site_subdomain" {
  description = "Subdomain used for the public site."
  type        = string
}

variable "tags" {
  description = "Tags applied to future hosting resources."
  type        = map(string)
  default     = {}
}
