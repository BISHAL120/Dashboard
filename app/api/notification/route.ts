import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data) {
      return NextResponse.json({ error: "data is required" }, { status: 400 });
    }

    const createNotification = await db.notification.create({
      data: {
        message: data.message,
        type: data.type,
        userId: data.userId, // TODO: Replace with actual user
        referId: data.referId,
      },
    });

    return NextResponse.json(
      {
        success: "Notification Created successfully",
        data: createNotification,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Something went wrong!", error);
    return NextResponse.json(
      { message: "Failed to create Notification", error: error },
      { status: 500 }
    );
  }
}
