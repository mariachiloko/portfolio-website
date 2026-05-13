# Deployment Module

This module will own the GitHub Actions deployment permissions layer:

- GitHub OIDC trust
- least-privilege IAM role
- S3 upload and CloudFront invalidation permissions

The module now provisions the GitHub OIDC provider, the deploy role, and the inline least-privilege policy.
