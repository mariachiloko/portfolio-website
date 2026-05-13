# Prod Environment

This root module is the live deployment target for the portfolio site.

It wires together the shared modules for:

- site hosting
- DNS and certificate naming
- deployment permissions

The module now creates the AWS resources needed for a private S3 origin, CloudFront, Route 53, ACM validation, and GitHub OIDC deployment access.

## Private Variables

Copy `terraform.tfvars.example` to `terraform.tfvars` in this directory and fill in your real values locally.

Do not commit the generated `terraform.tfvars` file. It is already ignored by the repo root `.gitignore`.
