provider "aws" {

  access_key = "dummy"
  secret_key = "dummy"
  region     = "us-east-1"

  s3_use_path_style           = true
  skip_credentials_validation = true
  skip_metadata_api_check     = true
  skip_requesting_account_id  = true

  endpoints {
    sqs = "http://localstack:4566"
    rds = "http://localstack:4578"
  }
}

resource "aws_sqs_queue" "send_verification_email" {
  name = "send_verification_email"
}
