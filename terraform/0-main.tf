provider "aws" {
    region = "eu-west-1"
    shared_credentials_files = ["~/.aws/credentials"]
    profile = "terraform"
}

data "archive_file" "lambda-zip" {
    type = "zip"
    source_dir = "lambda"
    output_path = "lambda.zip"
}