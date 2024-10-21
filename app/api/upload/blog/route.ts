import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data) {
      return NextResponse.json(
        { message: "data is required" },
        { status: 400 }
      );
    }

    if (!data.tittle) {
      return NextResponse.json(
        { message: "title is required" },
        { status: 400 }
      );
    }
    if (!data.value) {
      return NextResponse.json(
        { message: "value is required" },
        { status: 400 }
      );
    }
    if (!data.banner) {
      return NextResponse.json(
        { message: "banner is required" },
        { status: 400 }
      );
    }
    if (!data.author) {
      return NextResponse.json(
        { message: "author is required" },
        { status: 400 }
      );
    }
    console.log("Data fron routes :", data);

    const createBlog = await db.blog.create({
      data: {
        title: data.tittle,
        published: data.published,
        value: data.value,
        banner: data.banner,
        author: data.author,
        thumb: {
          Filename: data.Thumbnail.FileName,
          url: data.Thumbnail.url,
        },
      },
    });

    return NextResponse.json(
      {
        success: "Blog Created successfully",
        data: createBlog,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Something went wrong!", error);
    return NextResponse.json(
      { error: "Failed to create Blog" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();

    if (!data) {
      return NextResponse.json(
        { message: "data is required" },
        { status: 400 }
      );
    }

    if (!data.tittle) {
      return NextResponse.json(
        { message: "title is required" },
        { status: 400 }
      );
    }
    if (!data.value) {
      return NextResponse.json(
        { message: "value is required" },
        { status: 400 }
      );
    }
    if (!data.author) {
      return NextResponse.json(
        { message: "author is required" },
        { status: 400 }
      );
    }
    if (!data.banner) {
      return NextResponse.json(
        { message: "banner is required" },
        { status: 400 }
      );
    }
    if (!data.Thumbnail.Filename) {
      console.log("fileName", data);
      return NextResponse.json(
        { message: "Thumbnail is required" },
        { status: 400 }
      );
    }
    if (!data.Thumbnail.url) {
      console.log("'URL'");
      return NextResponse.json(
        { message: "Thumbnail is required" },
        { status: 400 }
      );
    }

    const UpgradeBlog = await db.blog.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.tittle,
        published: data?.published,
        value: data.value,
        banner: data.banner,
        author: data.author,
        thumb: {
          Filename: data.Thumbnail.Filename,
          url: data.Thumbnail.url,
        },
      },
    });

    return NextResponse.json(
      {
        success: "Blog Created successfully",
        data: UpgradeBlog,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Something went wrong ::", error);
    return NextResponse.json(
      { message: "Failed to Update Blog" },
      { status: 500 }
    );
  }
}
