variable "project_name" {
  description = "Short project identifier used for naming."
  type        = string
}

variable "environment" {
  description = "Environment name for this module call."
  type        = string
}

variable "site_fqdn" {
  description = "Fully qualified domain name used by the public site."
  type        = string
}

variable "certificate_arn" {
  description = "ACM certificate ARN used by CloudFront."
  type        = string
}

variable "default_root_object" {
  description = "Root object served by CloudFront."
  type        = string
  default     = "index.html"
}

variable "price_class" {
  description = "CloudFront price class for the distribution."
  type        = string
  default     = "PriceClass_100"
}

variable "tags" {
  description = "Tags applied to future hosting resources."
  type        = map(string)
  default     = {}
}
