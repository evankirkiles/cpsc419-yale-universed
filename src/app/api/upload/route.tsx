import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { S3Client } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { AWS_BUCKET_NAME, AWS_REGION } from "@/env";

export async function POST(request: Request) {
  const { filename, contentType } = await request.json();
  const ext = filename.split(".").pop();

  try {
    const client = new S3Client({
      region: AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
    const key = `${uuidv4()}.${ext}`;
    const { url, fields } = await createPresignedPost(client, {
      Bucket: AWS_BUCKET_NAME,
      Key: key,
      Conditions: [
        ["content-length-range", 1, 1048576 * 200], // up to 200 MB
        ["starts-with", "$Content-Type", contentType],
      ],
      Fields: {
        "Content-Type": contentType,
      },
      Expires: 600, // Seconds before the presigned post expires. 3600 by default.
    });
    return Response.json({ url, fields, key });
  } catch (error: any) {
    return Response.json({ error: error.message });
  }
}
