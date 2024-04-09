output "aws_bucket_name" {
  value = aws_s3_bucket.main.bucket
}

output "imgix_access_key_id" {
  value = aws_iam_access_key.imgix.id
}

output "imgix_secret_access_key" {
  value     = aws_iam_access_key.imgix.secret
  sensitive = true
}