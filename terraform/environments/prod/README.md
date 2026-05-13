# Prod Environment

This root module is the live deployment target for the portfolio site.

It wires together the shared modules for:

- site hosting
- DNS and certificate naming
- deployment permissions

The module now creates the AWS resources needed for a private S3 origin, CloudFront, Route 53, ACM validation, and GitHub OIDC deployment access.
