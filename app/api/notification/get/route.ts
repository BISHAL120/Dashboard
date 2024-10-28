import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await db.notification.findMany();
    return NextResponse.json({ message: "Successful", data: data });
  } catch (error) {
    console.log("Error is ", error);
    return NextResponse.json(
      { message: "Something went wrong!", Error: error },
      { status: 500 }
    );
  }
}
