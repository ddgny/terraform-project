resource "aws_s3_bucket" "image-upload-function-bucket" {
    bucket = "image-upload-function-bucket"
}

resource "aws_s3_bucket_object" "v1" {
    bucket = aws_s3_bucket.image-upload-function-bucket.id
    key = "1.0.0"
    source = "./lambda.zip"
}