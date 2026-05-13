data "aws_caller_identity" "current" {}

locals {
  role_name    = replace("${var.repository_full_name}-${var.branch_name}-deploy", "/", "-")
  oidc_subject = var.environment_name == null ? "repo:${var.repository_full_name}:ref:refs/heads/${var.branch_name}" : "repo:${var.repository_full_name}:environment:${var.environment_name}"
}

resource "aws_iam_openid_connect_provider" "github" {
  url             = "https://token.actions.githubusercontent.com"
  client_id_list  = [var.oidc_audience]
  thumbprint_list = var.github_oidc_thumbprints
}

data "aws_iam_policy_document" "assume_role" {
  statement {
    actions = ["sts:AssumeRoleWithWebIdentity"]

    principals {
      type        = "Federated"
      identifiers = [aws_iam_openid_connect_provider.github.arn]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = [var.oidc_audience]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:sub"
      values   = [local.oidc_subject]
    }
  }
}

data "aws_iam_policy_document" "deploy" {
  statement {
    sid = "AllowPrivateContentListing"

    actions = [
      "s3:GetBucketLocation",
      "s3:ListBucket",
    ]

    resources = [
      "arn:aws:s3:::${var.private_content_bucket_name}",
    ]
  }

  statement {
    sid = "AllowPrivateContentRead"

    actions = [
      "s3:GetObject",
    ]

    resources = [
      "arn:aws:s3:::${var.private_content_bucket_name}/*",
    ]
  }

  statement {
    sid = "AllowBucketListing"

    actions = [
      "s3:GetBucketLocation",
      "s3:ListBucket",
    ]

    resources = [
      "arn:aws:s3:::${var.bucket_name}",
    ]
  }

  statement {
    sid = "AllowArtifactSync"

    actions = [
      "s3:AbortMultipartUpload",
      "s3:DeleteObject",
      "s3:GetObject",
      "s3:ListBucketMultipartUploads",
      "s3:PutObject",
    ]

    resources = [
      "arn:aws:s3:::${var.bucket_name}/*",
    ]
  }

  statement {
    sid = "AllowCloudFrontInvalidation"

    actions = [
      "cloudfront:CreateInvalidation",
      "cloudfront:GetDistribution",
      "cloudfront:GetDistributionConfig",
    ]

    resources = [
      "arn:aws:cloudfront::${data.aws_caller_identity.current.account_id}:distribution/${var.distribution_id}",
    ]
  }
}

resource "aws_iam_role" "github_actions_deploy" {
  name               = local.role_name
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
  tags               = var.tags
}

resource "aws_iam_role_policy" "github_actions_deploy" {
  name   = "${local.role_name}-inline"
  role   = aws_iam_role.github_actions_deploy.id
  policy = data.aws_iam_policy_document.deploy.json
}
