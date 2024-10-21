import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { content, author, blogId } = await request.json();

    if (!content || !author || !blogId) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const createComment = await db.comment.create({
      data: {
        content,
        author,
        blogId,
      },
    });

    return NextResponse.json(
      {
        success: "Comment Added successfully",
        data: createComment,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Something went wrong!", error);
    return NextResponse.json(
      { error: "Failed to create Comment" },
      { status: 500 }
    );
  }
}
