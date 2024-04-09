/*
 * imgix.tf
 * author: Evan Kirkiles
 * created on Sun Apr 07 2024
 * 2024 Yale CPSC 419 
 *
 * An IAM user to use with Imgix.
 */

resource "aws_iam_user" "imgix" {
  name = "${local.prefix}-imgix"
}

# Expose an IAM access key for use in our Vercel environment
resource "aws_iam_access_key" "imgix" {
  user = aws_iam_user.imgix.name
}

resource "aws_iam_user_policy_attachment" "imgix" {
  policy_arn = aws_iam_policy.imgix.arn
  user       = aws_iam_user.imgix.name
}

resource "aws_iam_policy" "imgix" {
  name        = "${local.prefix}-imgix"
  description = "Policy for the Imgix IAM user."

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = ["s3:GetObject", "s3:ListBucket", "s3:GetBucketLocation"]
        Resource = [aws_s3_bucket.main.arn, "${aws_s3_bucket.main.arn}/*"]
      },
    ]
  })
}
