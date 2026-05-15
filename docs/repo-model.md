# Repository Model

This project is designed as a public scaffold with a separate private content source.

## Public Layer

- Generic React application
- Reusable Terraform and deployment patterns
- Example profile and project data
- Architecture and roadmap documentation

## Private Layer

- Real bio, project history, resume, and media
- Private local overrides
- Any production content source that should not appear in the public repository

## Operating Rules

- Treat branches as delivery tools, not privacy tools.
- Keep personal data out of the public repo.
- Use example content in public files.
- Use a separate private repo or private content source for the real site.
- Keep private overrides ignored so they do not reach GitHub by accident.

## Why This Design Works

- The public repository is safe to share because it only contains generic code, example content, and infrastructure code.
- The private content layer can change without forcing the public repository to carry personal data.
- GitHub Actions can check out the private repo at deploy time, mirror it to S3, and build the live site without exposing the content in the public repo.
- The same application code can serve both the public example site and the private production site.
- The deployment pipeline can be explained cleanly in interviews because each layer has one job.

For a plain-language walkthrough of the deployment flow, see [docs/private-content-flow.md](private-content-flow.md).
