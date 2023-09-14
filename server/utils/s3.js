const aws = require('aws-sdk')
const dotenv = require('dotenv')
const crypto = require('crypto')
const {promisify} = require('util')
const randomBytes = promisify(crypto.randomBytes)

dotenv.config()

const region = "us-east-2"
const bucketName = "pet-posts-bucket"
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY


const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
})

module.exports = async function generateUploadUrl() {
    const rawBytes = await randomBytes(16)
    const imageName = rawBytes.toString('hex')
    console.log(imageName);

    const params = ({
        Bucket: bucketName,
        Key: imageName,
        Expires: 900
    })

    const uploadUrl = await s3.getSignedUrlPromise('putObject', params)
    return uploadUrl
}
