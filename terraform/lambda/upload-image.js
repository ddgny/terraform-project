'use strict'


const AWS = require("aws-sdk");
const s3 = new AWS.S3();

const bucketName = "image-upload-function-bucket";

module.exports.handler = async (event) => {
    console.log(event);

    const response = {
        isBase64Encoded: false,
        statusCode: 200,
        body: JSON.stringify({ message: "Upload successful" }),
    };

    try {
        const parsedBody = JSON.parse(event.body);
        const base64File = parsedBody.file;
        const decodedFile = Buffer.from(base64File.replace(/^data:image\/\w+;base64,/, ""), "base64");

        const params = {
            Bucket: bucketName,
            Key: `images/${new Date().toISOString()}.jpeg`,
            Body: decodedFile,
            ContentType: "image/jpeg",
        };

        const uploadResult = await s3.upload(params).promise();

        response.body = JSON.stringify({ message: "Upload successful", uploadResult });
    } catch (e) {
        console.error(e);

        response.body = JSON.stringify({ message: "Upload failed", errorMessage: e });
        response.statusCode = 500;
    }

    return response;
};