# Portfolio Website

This repository is a reusable cloud engineering portfolio scaffold.

It is designed to demonstrate:
- AWS infrastructure with Terraform
- private S3 hosting behind CloudFront
- DNS with Route 53
- certificate management with ACM
- GitHub Actions CI/CD with GitHub OIDC
- least-privilege IAM and security-aware repo hygiene

The public repository stays generic. Real personal content and media are intentionally excluded from version control and will be supplied from a separate private source when the real site is built.

## How This Repo Stays Reusable

- Public code stays generic and template-like.
- Example data is checked in so the site works out of the box.
- Personal content stays outside the public repo.
- The real production site can use a separate private content source or a private repo.
- Branches are not treated as a privacy boundary.
- Local-only overrides remain gitignored during development.

See [docs/repo-model.md](docs/repo-model.md) for the full content separation model.

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
