import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const data = await db.brand.findMany({
      include: {
        Category: true,
      },
    });

    return NextResponse.json(
      { message: "Successful", data: data },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error is ", error);
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const response = await db.brand.create({ data: { ...body } });
    return NextResponse.json(
      { message: "Brand Created successfully", data: response },
      { status: 200 }
    );
  } catch (error) {
    console.log("Create brand error:", error);
    return NextResponse.json(
      { message: "Failed to Create brand" },
      { status: 500 }
    );
  }
}
export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const response = await db.brand.delete({
      where: {
        id: body.id,
      },
    });
    return NextResponse.json(
      { message: "Brand Deleted successfully", data: response },
      { status: 200 }
    );
  } catch (error) {
    console.log("Deleting Brand error:", error);
    return NextResponse.json(
      { message: "Failed to Deleting Brand" },
      { status: 500 }
    );
  }
}
