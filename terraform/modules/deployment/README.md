# Deployment Module

This module will own the GitHub Actions deployment permissions layer:

- GitHub OIDC trust
- least-privilege IAM role
- private content bucket sync access for CI
- S3 upload and CloudFront invalidation permissions
- optional extra OIDC subjects for the private content publisher

The module now provisions the GitHub OIDC provider, the deploy role, and the inline least-privilege policy.
