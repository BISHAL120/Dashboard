import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const prisma = new PrismaClient();
    const data = await prisma.blog.findMany({ take: 10 });
    await prisma.$disconnect();
    return NextResponse.json(
      { Data: data, message: "Successful" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { Error: error, message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
