variable "project_name" {
  description = "Short project identifier used for resource naming."
  type        = string
  default     = "portfolio-website"
}

variable "environment" {
  description = "Environment name for this root module."
  type        = string
  default     = "prod"
}

variable "aws_region" {
  description = "AWS region used by the environment."
  type        = string
  default     = "us-east-1"
}

variable "domain_name" {
  description = "Primary domain for the public site."
  type        = string
  default     = "example.com"
}

variable "site_subdomain" {
  description = "Subdomain used for the public site."
  type        = string
  default     = "www"
}

variable "github_repository" {
  description = "Repository that will trigger deployment."
  type        = string
  default     = "owner/repo"
}

variable "github_branch" {
  description = "Branch that will trigger deployment."
  type        = string
  default     = "master"
}

variable "oidc_audience" {
  description = "OIDC audience used by GitHub Actions."
  type        = string
  default     = "sts.amazonaws.com"
}

variable "tags" {
  description = "Additional tags applied to the environment."
  type        = map(string)
  default     = {}
}
