output "role_name" {
  description = "Deployment role name contract."
  value       = local.role_name
}

output "role_arn" {
  description = "Placeholder role ARN contract."
  value       = "arn:aws:iam::000000000000:role/${local.role_name}"
}

output "bucket_name" {
  description = "Bucket name passed through to the deployment contract."
  value       = var.bucket_name
}

output "distribution_id" {
  description = "CloudFront distribution passed through to the deployment contract."
  value       = var.distribution_id
}
