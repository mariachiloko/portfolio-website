# Terraform

Terraform infrastructure code will live here.

## Structure

- `environments/` contains root modules for deployable environments.
- `modules/` contains reusable building blocks shared by those environments.

## Phase 3 Result

- A `prod` environment root wires the future AWS resources together.
- Module scaffolds define the intended contracts for site hosting, DNS, and deployment automation.
- Phase 4 will replace the scaffolds with real AWS infrastructure.
