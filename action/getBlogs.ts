"use server";

import { NotificationType } from "@/Constants/notificationType";
import { db } from "@/lib/db";
import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";

export const getAllBlogs = async () => {
  const result = await db.blog.findMany({
    orderBy: { createdAt: "desc" },
  });
  return result;
};
export const getPublishedBlogs = async () => {
  const result = await db.blog.findMany({
    where: {
      published: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
};

export const getBlogById = async (id: string) => {
  const result = await db.blog.findUnique({ where: { id } });
  return result;
};

export const draftBlogById = async (id: string) => {
  const result = await db.blog.update({
    where: { id },
    data: {
      published: false,
    },
  });
  return result;
};

const s3Client = new S3Client({
  region: process.env.AWS_REGION || "", // S3 bucket region
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "", // AWS access key
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "", // AWS access key",
  },
});

export const deleteBlogById = async ({
  id,
  Filename,
  url,
}: {
  id: string;
  Filename: string;
  url: string;
}) => {
  try {
    if (!id || !url || !Filename) {
      return {
        message: "Id or thumb not found",
        success: false,
      };
    }
    const result = await db.blog.delete({
      where: { id },
    });

    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME || "",
      Key: `blogImage/thumbnail/${Filename}`,
    });
    await s3Client.send(command);

    await db.notification.create({
      data: {
        message: "Blog Deleted",
        type: NotificationType.BlogDeleted,
        userId: "Demo User", // TODO: Replace with actual user
        referId: id,
      },
    });

    return {
      message: "Blog deleted successfully",
      success: true,
      res: result,
    };
  } catch (error) {
    console.log("Failed to delete blog:", error);
  }
};
