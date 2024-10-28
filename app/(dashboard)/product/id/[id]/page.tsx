import React from "react";
import EditProduct from "@/components/product/editProduct";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import EditProduct2 from "@/components/product/editProduct2";

const NewProduct = async ({ params }: { params: { id: string } }) => {
  let getProduct = null;
  if (params.id !== "new") {
    getProduct = await db.product.findUnique({
      where: {
        id: params.id,
      },
    });
    if (getProduct === null) {
      redirect("/product/id/new");
    }
  }
  const getCategories = await db.category.findMany();
  const getBrands = await db.brand.findMany();
  const getTags = await db.tag.findMany();
  return (
    <div>
      <EditProduct
        categories={getCategories}
        brands={getBrands}
        getTags={getTags}
        id={params.id}
        initialData={getProduct}
      />
      {/* <EditProduct2 /> */}
    </div>
  );
};

export default NewProduct;
