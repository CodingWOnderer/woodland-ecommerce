import { z } from "zod";

const requestPayloadSchema = z.object({
  variants: z.array(
    z.object({
      id: z.string(),
      orderQuantity: z.number(),
    })
  ),
  circle: z.string(),
});

const responsePayloadSchema = z.object({
  variantId: z.string(),
  url: z.string().url(),
  quantity: z.number(),
  size: z.string(),
  color: z.string(),
  masterColor: z.string(),
  slug: z.string(),
  price: z.number(),
  offerPrice: z.number(),
  title: z.string(),
  isAvailable: z.boolean(),
  selectedQty: z.number(),
});

export type GoToCartResponse = z.infer<typeof responsePayloadSchema>;
export type GoToCartPayload = z.infer<typeof requestPayloadSchema>;
