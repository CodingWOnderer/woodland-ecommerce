import { z } from "zod";

const optionalFieldsSchema = z.object({
  fabric: z.string(),
  originCountry: z.string(),
  qtval: z.string(),
  sizeCount: z.number(),
});

const productMetaSchema = z.object({
  SkuImages: z.array(z.string().url()),
  color: z.string(),
  description: z.string(),
  discount: z.number(),
  masterColor: z.string(),
  offerPrice: z.number(),
  optionalFields: optionalFieldsSchema,
  price: z.number(),
  sizes: z.array(z.string()),
  skuId: z.string(),
  slug: z.string(),
  title: z.string(),
  urls: z.array(z.string().url()),
});

const productSchema = z.object({
  bestSeller: z.boolean(),
  brand: z.string(),
  category: z.array(z.string()),
  gender: z.string(),
  productId: z.string(),
  productMeta: z.array(productMetaSchema),
  totalQuantity: z.number(),
});

const responseSchema = z.object({
  status: z.enum(["success"]),
  code: z.number(),
  data: z.array(productSchema),
});

export type ApiResponse = Omit<
  ResponseModal<z.infer<typeof productSchema>[]>,
  "message"
>;

export const queryParamsSchema = z.object({
  category: z.string().optional(),
  page: z.number().optional(),
  bestSeller: z.boolean().optional(),
  brand: z.string().optional(),
  gender: z.string().optional(),
  sort: z.string().optional(),
  circle: z.string().optional(),
  color: z.array(z.string()).optional(),
  search: z.string().optional(),
  size: z.array(z.string()).optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  offer: z.boolean().optional(),
});

export type QueryParams = z.infer<typeof queryParamsSchema>;
