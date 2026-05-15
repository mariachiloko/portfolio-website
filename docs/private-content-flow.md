# Private Content Flow

This document explains how the public repository, private content, S3, and GitHub Actions fit together.

The goal is simple:

- keep personal content out of the public repo
- let GitHub Actions deploy the site automatically
- make the process easy to explain to someone else

## The Big Idea

The project uses two different content layers:

- a **public layer** in the GitHub repository
- a **private layer** that holds the real content

The public layer contains the code, generic example data, and infrastructure.
The private layer contains the real photo, resume, and personal site data.

GitHub Actions connects the two during deployment.

## What Lives Where

### Public repository

The public repo contains:

- the Vite + React app
- Terraform infrastructure code
- GitHub Actions workflows
- generic example content
- documentation

This part is safe to share publicly.

### Private content source

The private content source contains:

- `private-content/data/*.local.json`
- `private-content/media/personal/*`
- `private-content/resume/*`

This folder is intentionally ignored by git.
It is your local editing area for the real site content.

### Private S3 content bucket

The private S3 bucket is the shared handoff point for deployment.

GitHub Actions mirrors the private content into that bucket so the deploy job can use it.

### Public site bucket

The public S3 bucket stores the built website output.

That bucket is what CloudFront serves to visitors.

## End-To-End Flow

### 1. You update private content

You edit files in the private content source.

Example:

- replace the profile photo
- update resume content
- change experience or education details

You do **not** put those files in the public repo.

### 2. You push a commit to the public repo

The commit to `master` triggers the GitHub Actions workflow.

That workflow is the automation that performs the deployment.

### 2b. A private content push can also trigger deployment

When you push to the private content repo, that repo can send a `repository_dispatch` event to the public repo.

That dispatch event tells the public workflow that content changed and it should redeploy.

This is the piece that removes the need to manually jump back to the public repo every time you update content.

### 3. GitHub Actions checks out the private content source

The deploy job uses a separate private repository or private content source.

It checks out that source into the workflow runner.

This is important because the public repo still does not contain your personal files.

### 4. GitHub Actions mirrors the private content into S3

The workflow syncs the checked-out private files into the private S3 content bucket.

This step keeps the private S3 bucket in sync with the current private content source.

### 5. GitHub Actions builds the site

The site build reads the checked-out private content in the workflow runner.

The React app then uses the real content instead of the generic example content.

### 6. GitHub Actions uploads the built site

After the build finishes, the workflow syncs the generated `dist/` folder to the public site bucket.

That bucket holds the static files that visitors will load.

### 7. CloudFront is invalidated

The workflow creates a CloudFront invalidation.

That tells CloudFront to serve the newest files instead of cached older ones.

## Why This Design Is Useful

### The public repo stays safe

Anyone can read the public repo without seeing your private content.

That is the main privacy requirement.

### Deployment still stays automated

You do not need to manually rebuild or upload the website each time.

GitHub Actions handles the repeatable deployment steps for you.

### The same code works for both example and real content

The React app loads example JSON by default.

When private content is present, the same app loads the real content instead.

That means the code stays reusable.

### The deployment is easy to describe

You can explain the system in one sentence:

> The public repo contains the reusable website code, and GitHub Actions pulls private content from a separate source, mirrors it to S3, builds the site, and deploys it.

## What To Say In An Interview

If someone asks how this works, you can say:

1. The public GitHub repo only holds generic code and example content.
2. My real content lives separately so it never appears in the public repo.
3. GitHub Actions checks out that private content during deploy.
4. The workflow mirrors the private content into a private S3 bucket.
5. The site is built from that content and then published to the public site bucket.
6. CloudFront serves the final result.

That gives you a clean explanation of the privacy model and the deployment model at the same time.

## Important Detail

This design does **not** rely on your laptop being the source of truth at deploy time.

Your local `private-content/` folder is for editing and understanding the structure.
The production deploy should pull from a separate private source that GitHub Actions can access.

That is what keeps the public repository generic while still letting the live site use personal content.

## Implementation Notes

These are the concrete repo changes that support this flow:

- The deploy workflow now checks out a separate private content source before building.
- The workflow mirrors that private content into the private S3 content bucket.
- The deploy IAM role now has permission to write to the private content bucket and the public site bucket.
- The repository documentation now explains the content separation model in plain language.

In practice, that means the public repo describes and automates the deployment flow, but it still does not contain your personal files.

## What GitHub Needs

For the workflow to work, GitHub needs a few repository settings:

- `PRIVATE_CONTENT_REPOSITORY` so Actions knows which private repo to check out
- `PRIVATE_CONTENT_REF` so Actions knows which branch or tag to use
- `PRIVATE_CONTENT_TOKEN` so Actions can access the private repo
- `PRIVATE_CONTENT_BUCKET_NAME` so Actions knows where to mirror the content
- the normal AWS and CloudFront variables for the public site deploy

If one of those values is missing, the workflow can still run but it will fail when it tries to fetch or publish content.

## How The Trigger Works

The cleanest real-world setup is:

1. You push content changes to the private repo.
2. A workflow in the private repo sends a `repository_dispatch` event to the public repo.
3. The public repo workflow runs.
4. The public workflow checks out the private content repo, mirrors it to S3, builds the site, and deploys it.

That means the private repo becomes the content source and the public repo becomes the deployment target.

If you also push code changes in the public repo, the same public workflow still runs on `push` to `master`.
So both content changes and code changes land in the same deployment pipeline.

### Example private-repo trigger

The private repo needs a small workflow that notifies the public repo after content changes.

Example shape:

```yaml
name: Notify public deploy

on:
  push:
    branches:
      - main

jobs:
  dispatch:
    runs-on: ubuntu-latest
    steps:
      - name: Notify public repo
        run: |
          curl -X POST \
            -H "Accept: application/vnd.github+json" \
            -H "Authorization: Bearer $TOKEN" \
            -H "X-GitHub-Api-Version: 2022-11-28" \
            https://api.github.com/repos/OWNER/portfolio-website/dispatches \
            -d '{"event_type":"content-updated"}'
        env:
          TOKEN: ${{ secrets.PUBLIC_REPO_DISPATCH_TOKEN }}
```

The token in the private repo should have permission to send a dispatch event to the public repo.
You only need to wire that up once.
