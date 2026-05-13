output "role_name" {
  description = "Deployment role name."
  value       = aws_iam_role.github_actions_deploy.name
}

output "role_arn" {
  description = "Deployment role ARN."
  value       = aws_iam_role.github_actions_deploy.arn
}

output "oidc_provider_arn" {
  description = "GitHub OIDC provider ARN."
  value       = aws_iam_openid_connect_provider.github.arn
}

output "bucket_name" {
  description = "Bucket name used by the deployment contract."
  value       = var.bucket_name
}

output "distribution_id" {
  description = "CloudFront distribution used by the deployment contract."
  value       = var.distribution_id
}
