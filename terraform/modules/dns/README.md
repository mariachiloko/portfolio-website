# DNS Module

This module will own the DNS and certificate naming layer:

- Route 53 hosted zone wiring
- ACM certificate inputs
- public site domain records

The module can either provision a hosted zone or reuse an existing hosted zone ID, then it handles ACM certificate validation and Route 53 alias records for the CloudFront distribution.
