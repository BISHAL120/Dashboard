import { z } from "zod";

export const FormSchema = z.object({
  name: z.string(),
  price: z.string(),
  discountPrice: z.string().optional(),
  category: z.string(),
  brand: z.string(),
  material: z.string(),
  weight: z.string(),
  dimensions: z.string(),
  varients: z.array(
    z.object({
      size: z.string(),
      color: z.array(
        z.object({
          color: z.string(),
          stock: z.number(),
        })
      ),
    })
  ),
  description: z.string(),
  images: z.array(
    z.object({
      imageUrl: z.string().url(),
      filename: z.string(),
    })
  ),
  tags: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
    })
  ),
  published: z.boolean(),
  isFeatured: z.boolean(),
  type: z.string(),
});
