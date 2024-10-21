import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const response = await db.product.create({ data: { ...body } });
    return NextResponse.json({
      message: "Product uploaded successfully",
      data: response,
    });
  } catch (error) {
    console.log("Upload product error:", error);
    return NextResponse.json(
      { message: "Failed to upload product" },
      { status: 500 }
    );
  }
}
