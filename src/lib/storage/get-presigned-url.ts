"use server"

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export const getPresignedUrl = async (code: string, filename: string, password: boolean) => {
    const S3 = new S3Client({
        region: process.env.S3_REGION as string || 'us-east-1',
        endpoint: process.env.S3_ENDPOINT,
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string
        }
    })

    const command = new PutObjectCommand({
        Bucket: process.env.S3_BUCKET as string,
        Key: 'data/' + code + '/' + filename,
        ACL: password ? 'private' : 'public-read'
    })

    return getSignedUrl(S3, command, { expiresIn: 3600 })
}
