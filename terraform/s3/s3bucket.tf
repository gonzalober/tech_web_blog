provider "aws" {
  region = "us-east-1"
}
resource "aws_s3_bucket" "terraform-state-storage-s3" {
  bucket = "gonzalo-terraform-remote-state-storage-s3"
  versioning {
    enabled = true
  }
  lifecycle {
    prevent_destroy = true
  }
}
# create a dynamodb table for locking the state file
resource "aws_dynamodb_table" "dynamodb-terraform-state-lock" {
  name           = "gonzalo-terraform-state-lock-dynamo"
  hash_key       = "LockID"
  read_capacity  = 20
  write_capacity = 20
  attribute {
    name = "LockID"
    type = "S"
  }
}
