terraform {
  backend "s3" {
    encrypt        = true
    bucket         = "gonzalo-terraform-remote-state-storage-s3"
    dynamodb_table = "gonzalo-terraform-state-lock-dynamo"
    region         = "us-east-1"
    key            = "path"
  }
}
