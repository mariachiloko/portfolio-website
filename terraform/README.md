# Terraform

Terraform infrastructure code will live here.

## Structure

- `environments/` contains root modules for deployable environments.
- `modules/` contains reusable building blocks shared by those environments.

## Phase 4 Result

- A `prod` environment root wires the AWS resources together.
- The shared modules provision site hosting, DNS and ACM validation, and GitHub OIDC deployment access.
- The environment also provisions a private S3 content bucket that GitHub Actions can mirror during deploy.
- The deploy role can trust both the public site repo and the private content repo branch so the same AWS role can serve both workflows.
- The DNS module can create a new Route 53 hosted zone or use an existing hosted zone ID supplied through private local variables.
- The root environment adds Route 53 alias records for the public site hostname.
- If you use a custom domain, update your registrar or parent zone with the Route 53 name servers from the prod outputs.

## Private Variables

- Keep real domain, hosted zone, and deployment values in a local `terraform.tfvars`.
- Use `terraform/environments/prod/terraform.tfvars.example` as the tracked template.
- Do not commit the generated `terraform.tfvars` file.
- Use the private content bucket output to mirror the private content repo into CI when you are ready for the live site to use it.
