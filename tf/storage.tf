/*
 * storage.tf
 * author: Evan Kirkiles
 * created on Sun Apr 07 2024
 * 2024 Yale CPSC 419 
 */

# Bucket for Yale Vision assets (models, images)
resource "aws_s3_bucket" "main" {
  bucket = "${local.prefix}-main"
}

# CORS config for the project
resource "aws_s3_bucket_cors_configuration" "main" {
  bucket = aws_s3_bucket.main.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["PUT", "POST"]
    allowed_origins = ["https://cpsc419-yale-universed.vercel.app", "http://localhost:3000"]
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }

  cors_rule {
    allowed_methods = ["GET"]
    allowed_origins = ["https://cpsc419-yale-universed.vercel.app", "http://localhost:3000"]
  }
}

# Allow public access
resource "aws_s3_bucket_public_access_block" "main" {
  bucket = aws_s3_bucket.main.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

# Only allow public read access to the bucket
resource "aws_s3_bucket_policy" "main" {
  bucket = aws_s3_bucket.main.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = "s3:GetObject"
        Resource = "${aws_s3_bucket.main.arn}/*"
      },
    ]
  })
}

/* ----------------------------------- IAM ---------------------------------- */

resource "aws_iam_user" "main" {
  name = "${local.prefix}-nextjs"
}

# Expose an IAM access key for use in our Vercel environment
resource "aws_iam_access_key" "main" {
  user = aws_iam_user.main.name
}


resource "aws_iam_user_policy_attachment" "main" {
  policy_arn = aws_iam_policy.main.arn
  user       = aws_iam_user.main.name
}

resource "aws_iam_policy" "main" {
  name        = "${local.prefix}-put-post-access"
  description = "Allow PUT and POST access to the bucket for uploading."
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = ["s3:GetObject", "s3:ListBucket", "s3:PutObject", "s3:PutObjectAcl"]
        Resource = "${aws_s3_bucket.main.arn}/*"
      },
    ]
  })
}