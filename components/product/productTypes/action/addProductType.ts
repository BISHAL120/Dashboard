"use server";

import { db } from "@/lib/db";

export const CreateTypes = async (types: string) => {
  try {
    const res = await db.productType.create({
      data: {
        type: types,
      },
    });
    console.log(res);
    return res;
  } catch (error) {
    console.log("Error is ", error);
    return error;
  }
};
