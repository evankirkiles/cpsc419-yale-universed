terraform {
  cloud {
    organization = "evankirkiles"
    workspaces {
      name = "yale-cpsc419"
    }
  }

  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "1.4.0"
    }
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "vercel" {
  api_token = var.vercel_api_token
}

# Configure the AWS Provider
provider "aws" {
  region     = "us-east-1"
  access_key = var.aws_access_key_id
  secret_key = var.aws_secret_access_key

  default_tags {
    tags = {
      Project = "cpsc419-yalevision"
    }
  }
}

locals {
  prefix = "cpsc419-yalevision"
}

/* --------------------------------- Vercel --------------------------------- */

data "vercel_project" "main" {
  name = "cpsc419-yale-universed"
}

resource "vercel_project_environment_variable" "aws_access_key_id" {
  project_id = data.vercel_project.main.id
  key        = "AWS_ACCESS_KEY_ID"
  value      = aws_iam_access_key.main.id
  target     = ["production", "preview", "development"]
}

resource "vercel_project_environment_variable" "aws_secret_access_key" {
  project_id = data.vercel_project.main.id
  key        = "AWS_SECRET_ACCESS_KEY"
  value      = aws_iam_access_key.main.secret
  target     = ["production", "preview", "development"]
}

resource "vercel_project_environment_variable" "aws_bucket_name" {
  project_id = data.vercel_project.main.id
  key        = "NEXT_PUBLIC_AWS_BUCKET_NAME"
  value      = aws_s3_bucket.main.bucket
  target     = ["production", "preview", "development"]
}
