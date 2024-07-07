import { z } from "zod";

const ProductMeta = z.object({
  slug: z.string(),
  urls: z.array(z.string()),
  SkuImages: z.array(z.string()),
  color: z.string(),
  description: z.string(),
  discount: z.number(),
  masterColor: z.string(),
  offerPrice: z.number(),
  optionalFields: z.object({
    fabric: z.string(),
    originCountry: z.string(),
    qtval: z.string(),
    sizeCount: z.number(),
  }),
  price: z.number(),
  sizes: z.array(z.string()),
  skuId: z.string(),
  title: z.string(),
});

const Size = z.object({
  dimension: z.string(),
  onHold: z.number(),
  quantity: z.number(),
  size: z.string(),
  variantID: z.string(),
});

const OptionalFields = z.object({
  bestseller: z.boolean(),
  discount: z.number(),
  eanCode: z.string(),
  isFavSports: z.boolean(),
  isRefundable: z.boolean(),
  manufacturingAddress: z.string(),
  marketedBy: z.string(),
  new: z.boolean(),
  offerPrice: z.number(),
  price: z.number(),
});

const productDataSchema = z.object({
  _id: z.string(),
  articleCode: z.string(),
  bestSeller: z.boolean(),
  brand: z.string(),
  category: z.array(z.string()),
  circle: z.string(),
  gender: z.string(),
  hsnCode: z.string(),
  isPublished: z.boolean(),
  optionalFields: OptionalFields,
  primaryKey: z.string(),
  productId: z.string(),
  productMeta: z.array(ProductMeta),
  sizes: z.array(Size),
  tags: z.nullable(z.unknown()),
  totalQuantity: z.number(),
});

const ResponseSchema = z.object({
  status: z.enum(["success", "error"]),
  code: z.number(),
  message: z.string(),
  data: productDataSchema,
});

export type ParsedProductData = z.infer<typeof ResponseSchema>;
