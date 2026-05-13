# Terraform

Terraform infrastructure code will live here.

## Structure

- `environments/` contains root modules for deployable environments.
- `modules/` contains reusable building blocks shared by those environments.

## Phase 4 Result

- A `prod` environment root wires the AWS resources together.
- The shared modules provision site hosting, DNS and ACM validation, and GitHub OIDC deployment access.
- The root environment adds Route 53 alias records for the public site hostname.
