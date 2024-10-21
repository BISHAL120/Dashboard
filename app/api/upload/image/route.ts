import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import sharp from "sharp";

const s3Client = new S3Client({
  region: process.env.AWS_REGION || "", // S3 bucket region
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "", // AWS access key
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "", // AWS access key",
  },
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File; // Assuming file input from form

    if (!file) {
      return NextResponse.json({ error: "file is required" }, { status: 400 });
    }

    // Convert the file to a buffer
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    // Convert the image to WebP format
    const webpImageBuffer = await sharp(fileBuffer)
      .webp({ quality: 80 })
      .toBuffer();

    const fileUrl = await uploadImageS3(webpImageBuffer, file.name);

    return NextResponse.json(
      {
        success: "Image uploaded successfully",
        URL: fileUrl,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error uploading image to S3:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}

async function uploadImageS3(buffer: Buffer, fileName: string) {
  const fileBuffer = buffer;

  const { v4: uuidv4 } = require("uuid");
  const newFileName = `${uuidv4()}.webp`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME || "",
    Key: `blogImage/content/${newFileName}`,
    Body: fileBuffer,
    ContentType: "image/webp",
  });

  await s3Client.send(command);
  const URL = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/blogImage/content/${newFileName}`;

  return URL;
}
