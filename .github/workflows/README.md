# Workflows

`deploy.yml` builds the React app on pull requests, push events, and private-content dispatch events, then deploys the production build to AWS on `master` using GitHub OIDC.

On production deploys, the workflow pulls the latest private content from the private S3 bucket, builds the site from those files, and deploys the static output to the public bucket.

Private repo pushes should first sync the private content into S3 and then send a `repository_dispatch` event to this workflow so content-only changes can redeploy without touching the public repo.

Set the following repository variables before enabling deployments:

- `AWS_REGION`
- `AWS_ROLE_ARN`
- `S3_BUCKET_NAME`
- `CLOUDFRONT_DISTRIBUTION_ID`
- `SITE_FQDN`
- `PRIVATE_CONTENT_BUCKET_NAME`
