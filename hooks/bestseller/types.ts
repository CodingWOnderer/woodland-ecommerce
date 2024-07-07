import { z } from "zod";

const SkuImagesSchema = z.array(z.string().url());

const OptionalFieldsSchema = z.object({
  fabric: z.string(),
  originCountry: z.string(),
  qtval: z.string(),
  sizeCount: z.number(),
});

const ProductMetaSchema = z.object({
  SkuImages: SkuImagesSchema,
  color: z.string(),
  description: z.string(),
  discount: z.number(),
  masterColor: z.string(),
  offerPrice: z.number(),
  optionalFields: OptionalFieldsSchema,
  price: z.number(),
  sizes: z.array(z.string()),
  skuId: z.string(),
  slug: z.string(),
  title: z.string(),
  urls: z.array(z.string().url()),
});

const DataSchema = z.object({
  bestSeller: z.boolean(),
  brand: z.string(),
  category: z.array(z.string()),
  gender: z.string(),
  productId: z.string(),
  productMeta: z.array(ProductMetaSchema),
  totalQuantity: z.number(),
});

export type ProductSchema = ResponseModal<z.infer<typeof DataSchema>[]>;
