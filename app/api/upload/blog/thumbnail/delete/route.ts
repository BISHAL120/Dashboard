import { db } from "@/lib/db";
import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

const s3Client = new S3Client({
  region: process.env.AWS_REGION || "", // S3 bucket region
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "", // AWS access key
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "", // AWS access key",
  },
});

export async function POST(request: Request) {
  try {
    const { fileName, id } = await request.json();

    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME || "",
      Key: `blogImage/thumbnail/${fileName}`,
    });

    const res = await s3Client.send(command);

    await db.blog.update({
      where: {
        id,
      },
      data: {
        banner: "",
        thumb: {
          Filename: "",
          url: "",
        },
      },
    });

    return NextResponse.json(
      {
        message: "Thumbnail Deleted successfully",
        data: res,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error deleting Thumbnail from S3:", error);
    return NextResponse.json(
      { message: "Failed to delete thumbnail" },
      { status: 500 }
    );
  }
}
