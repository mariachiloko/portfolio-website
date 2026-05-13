variable "repository_full_name" {
  description = "GitHub repository allowed to assume the deployment role."
  type        = string
}

variable "branch_name" {
  description = "Git branch allowed to assume the deployment role."
  type        = string
}

variable "bucket_name" {
  description = "Name of the bucket that will receive build output."
  type        = string
}

variable "distribution_id" {
  description = "CloudFront distribution identifier."
  type        = string
}

variable "oidc_audience" {
  description = "OIDC audience accepted by the role trust policy."
  type        = string
  default     = "sts.amazonaws.com"
}

variable "github_oidc_thumbprints" {
  description = "Thumbprints used for the GitHub OIDC provider."
  type        = list(string)
  default     = ["6938fd4d98bab03faadb97b34396831e3780aea1"]
}

variable "tags" {
  description = "Tags applied to future deployment resources."
  type        = map(string)
  default     = {}
}
