locals {
  role_name = replace("${var.repository_full_name}-${var.branch_name}-deploy", "/", "-")
}

# Phase 4 will replace these placeholder contracts with real IAM resources.
