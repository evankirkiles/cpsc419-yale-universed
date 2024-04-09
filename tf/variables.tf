/*
 * variables.tf
 * author: Evan Kirkiles
 * created on Sun Apr 07 2024
 * 2024 Yale CPSC 419 
 */

variable "vercel_api_token" {
  description = "API token for Vercel access."
  type        = string
  nullable    = false
  sensitive   = true
}

variable "aws_access_key_id" {
  description = "AWS access key ID for S3 bucket access."
  type        = string
  nullable    = false
  sensitive   = true
}

variable "aws_secret_access_key" {
  description = "AWS secret access key for S3 bucket access."
  type        = string
  nullable    = false
  sensitive   = true
}