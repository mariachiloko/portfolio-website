# Portfolio Website

This repository is a reusable cloud engineering portfolio scaffold.

It is designed to demonstrate:
- AWS infrastructure with Terraform
- private S3 hosting behind CloudFront
- DNS with Route 53
- certificate management with ACM
- GitHub Actions CI/CD with GitHub OIDC
- least-privilege IAM and security-aware repo hygiene

The public repository stays generic. Miguel's real personal content and media are intentionally excluded from version control and will be added locally later.

## Repository Rules

- Do not commit secrets, `.env` files, Terraform state, or AWS credentials.
- Do not create real `terraform.tfvars`.
- Keep private site content local and gitignored.
- Use placeholder data in the public repo.

## Planned Structure

- `website/` React frontend
- `terraform/` reusable infrastructure modules
- `.github/workflows/` GitHub Actions pipelines
- `docs/` architecture, security, roadmap, and cost guidance
