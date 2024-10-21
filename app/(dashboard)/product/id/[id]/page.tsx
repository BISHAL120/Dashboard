import React from "react";
import EditProduct from "@/components/product/editProduct";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

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
  return (
    <div className="-z-10 min-h-[calc(100vh-80px)] w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
      <div className="min-h-[calc(100vh-80px)] bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]">
        <EditProduct id={params.id} initialData={getProduct} />
      </div>
    </div>
  );
};

export default NewProduct;

<div>
  <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
</div>;
