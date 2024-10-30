"use server";

import { db } from "@/lib/db";

export const CreateTypes = async (types: string) => {
  try {
    const res = await db.productType.create({
      data: {
        type: types,
      },
    });
    return res;
  } catch (error) {
    console.log("Error is ", error);
    return error;
  }
};
export const DeleteTypes = async (id: string) => {
  try {
    const res = await db.productType.delete({
      where: {
        id: id,
      },
    });
    return res;
  } catch (error) {
    console.log("Error is ", error);
    return error;
  }
};
