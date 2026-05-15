# Workflows

`deploy.yml` builds the React app on pull requests and push events, then deploys the production build to AWS on `master` using GitHub OIDC.

On production deploys, the workflow also checks out a separate private content repository, mirrors that content into the private S3 bucket, and then builds the site from the private files.

Set the following repository variables before enabling deployments:

- `AWS_REGION`
- `AWS_ROLE_ARN`
- `S3_BUCKET_NAME`
- `CLOUDFRONT_DISTRIBUTION_ID`
- `SITE_FQDN`
- `PRIVATE_CONTENT_BUCKET_NAME`
- `PRIVATE_CONTENT_REPOSITORY`
- `PRIVATE_CONTENT_REF`

Set this secret before enabling private content checkout:

- `PRIVATE_CONTENT_TOKEN`
