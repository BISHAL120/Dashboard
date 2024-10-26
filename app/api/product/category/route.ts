import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const paramsObject: any = {};
    searchParams.forEach((value, key) => {
      paramsObject[key] =
        value === "true" ? true : value === "false" ? false : value;
    });

    const data = await db.category.findMany({
      include: {
        ...paramsObject,
      },
    });

    return NextResponse.json(
      { message: "Successful", data: data },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error is ", error);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const response = await db.category.create({ data: { ...body } });
    return NextResponse.json(
      { message: "Category Created successfully", data: response },
      { status: 200 }
    );
  } catch (error) {
    console.log("Create category error:", error);
    return NextResponse.json(
      { message: "Failed to Create category" },
      { status: 500 }
    );
  }
}
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const response = await db.category.update({
      where: { id: body.id },
      data: {
        name: body.name,
      },
    });
    return NextResponse.json(
      { message: "Category Updated successfully", data: response },
      { status: 200 }
    );
  } catch (error) {
    console.log("Update category error:", error);
    return NextResponse.json(
      { message: "Failed to Update category" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();

    const relatedBrands = await db.brand.findMany({
      where: {
        categoryId: body.id,
      },
    });

    // If there are any related Brands, prevent deletion
    if (relatedBrands.length > 0) {
      return NextResponse.json(
        { message: "Delete Related Brands First" },
        { status: 400 }
      );
    }

    const response = await db.category.delete({
      where: {
        id: body.id,
      },
    });
    return NextResponse.json(
      { message: "Category Deleted successfully", data: response },
      { status: 200 }
    );
  } catch (error) {
    console.log("Deleting category error:", error);
    return NextResponse.json(
      { message: "Failed to Deleting category" },
      { status: 500 }
    );
  }
}
