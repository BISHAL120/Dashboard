import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const data = await db.productType.findMany();

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
