import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data.id) {
      const response = await db.notification.updateMany({
        data: {
          read: true,
        },
      });
      return NextResponse.json(
        { message: "All Notification marked as read", data: response },
        { status: 200 }
      );
    }

    const response = await db.notification.update({
      where: {
        id: data.id,
      },
      data: {
        read: true,
      },
    });
    return NextResponse.json(
      { message: "Notification marked as read", data: response },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error is ", error);
    return NextResponse.json(
      { meassage: "Something went wrong!", Error: error },
      { status: 500 }
    );
  }
}
