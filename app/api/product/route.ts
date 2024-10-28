import { NotificationType } from "@/Constants/notificationType";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
      name,
      price,
      discountPrice,
      category,
      brand,
      material,
      weight,
      dimensions,
      published,
      tags,
      type,
      description,
      isFeatured,
      varients,
      images,
    } = await req.json();

    if (
      !name ||
      !price ||
      !category ||
      !brand ||
      !description ||
      varients.length === 0 ||
      images.length === 0 ||
      tags.length === 0
    ) {
      return NextResponse.json(
        {
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    await Promise.all(
      tags.map(async (tag: { id: string; text: string }) => {
        await db.tag.upsert({
          where: { text: tag.text },
          update: {},
          create: { text: tag.text },
        });
      })
    );

    const createProductTags = tags.map(
      (tag: { id: string; text: string }) => tag.text
    );

    console.log(
      name,
      price,
      discountPrice,
      category,
      brand,
      material,
      weight,
      dimensions,
      varients,
      description,
      published,
      isFeatured,
      images,
      createProductTags,
      type
    );

    const response = await db.product.create({
      data: {
        name: name,
        price: price,
        discountPrice: discountPrice,
        categoryName: category.name,
        brandName: brand.name,
        material: material,
        weight: weight,
        dimensions: dimensions,
        varients: varients,
        description: description,
        published: published,
        isFeatured: isFeatured,
        images: images,
        tags: createProductTags,
        type: type,
        productTypeId: type.id,
        categoryId: category.id,
        brandId: brand.id,
      },
    });
    await db.notification.create({
      data: {
        userId: "Demo User",
        message: "Product created",
        type: NotificationType.ProductCreated,
        referId: response.id,
      },
    });

    return NextResponse.json({
      message: "Product created successfully",
      data: response,
    });
  } catch (error) {
    console.log("Upload product error:", error);
    return NextResponse.json(
      { message: "Failed to create product" },
      { status: 500 }
    );
  }
}
