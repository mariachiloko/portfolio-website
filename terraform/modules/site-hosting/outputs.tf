output "bucket_name" {
  description = "Bucket name for the private origin."
  value       = aws_s3_bucket.site.bucket
}

output "bucket_arn" {
  description = "Bucket ARN for the private origin."
  value       = aws_s3_bucket.site.arn
}

output "distribution_id" {
  description = "CloudFront distribution ID."
  value       = aws_cloudfront_distribution.site.id
}

output "distribution_domain_name" {
  description = "CloudFront distribution domain name."
  value       = aws_cloudfront_distribution.site.domain_name
}

output "distribution_hosted_zone_id" {
  description = "CloudFront hosted zone ID for Route 53 alias records."
  value       = aws_cloudfront_distribution.site.hosted_zone_id
}

output "origin_access_control_id" {
  description = "Origin access control ID."
  value       = aws_cloudfront_origin_access_control.site.id
}
