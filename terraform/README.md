# Terraform

Terraform infrastructure code will live here.

## Structure

- `environments/` contains root modules for deployable environments.
- `modules/` contains reusable building blocks shared by those environments.

## Phase 4 Result

- A `prod` environment root wires the AWS resources together.
- The shared modules provision site hosting, DNS and ACM validation, and GitHub OIDC deployment access.
- The DNS module can create a new Route 53 hosted zone or use an existing hosted zone ID supplied through private local variables.
- The root environment adds Route 53 alias records for the public site hostname.
- If you use a custom domain, update your registrar or parent zone with the Route 53 name servers from the prod outputs.

## Private Variables

- Keep real domain, hosted zone, and deployment values in a local `terraform.tfvars`.
- Use `terraform/environments/prod/terraform.tfvars.example` as the tracked template.
- Do not commit the generated `terraform.tfvars` file.
