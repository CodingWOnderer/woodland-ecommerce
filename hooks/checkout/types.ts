import { z } from "zod";

const cartItemSchema = z.object({
  variantId: z.string(),
  quantity: z.number(),
});

const promoRequestSchema = z.object({
  circle: z.string(),
  promo: z.string(),
  subOrders: z.array(cartItemSchema),
});

export const promoResponseDataSchema = z.object({
  code: z.number(),
  data: z
    .object({
      totalDiscount: z.number().optional(),
      promoCode: z.string().optional(),
    })
    .optional(),
});

export type PromoRequest = z.infer<typeof promoRequestSchema>;
export type PromoResponseData = z.infer<typeof promoResponseDataSchema>;
