terraform {
  backend "s3" {
    encrypt        = true
    bucket         = "adgb-terraform-remote-state-storage-s3"
    dynamodb_table = "adgb-terraform-state-lock-dynamo"
    region         = "us-east-1"
    key            = "path/to/my/key"
  }
}