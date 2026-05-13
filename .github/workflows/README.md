# Workflows

`deploy.yml` builds the React app on pull requests and push events, then deploys the production build to AWS on `master` using GitHub OIDC.

Set the following repository variables before enabling deployments:

- `AWS_REGION`
- `AWS_ROLE_ARN`
- `S3_BUCKET_NAME`
- `CLOUDFRONT_DISTRIBUTION_ID`
- `SITE_FQDN`
