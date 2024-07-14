import { z } from "zod";

const addressSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  address: z.string(),
  pincode: z.string(),
  city: z.string(),
  state: z.string(),
  landmark: z.string().optional(),
  addressType: z.string(),
});

const statusSchema = z.object({
  status: z.string(),
  time: z.string(),
  message: z.string(),
});

const subOrderSchema = z.object({
  subOrderId: z.string(),
  productId: z.string(),
  slug: z.string(),
  variantId: z.string(),
  discount: z.number(),
  quantity: z.number(),
  finalPrice: z.number(),
  price: z.number(),
  variantPrice: z.number(),
  offerPrice: z.number(),
  gst: z.number(),
  status: z.array(statusSchema),
  invoiceDate: z.string().optional(),
  invoiceNumber: z.string().optional(),
  store: z.string().optional(),
  awbNumber: z.string().optional(),
  refNumber: z.string().optional(),
  deliveryPartner: z.string().optional(),
  refund: z.unknown().optional(),
  taxAmount: z.number(),
  imageURL: z.string().url(),
  name: z.string(),
  color: z.string(),
  size: z.string(),
  categories: z.array(z.string()),
  gender: z.string(),
});

const dataSchema = z.object({
  userId: z.string(),
  email: z.string().email(),
  phone: z.string(),
  razorpayOrderId: z.string().optional(),
  razorpayPaymentId: z.string().optional(),
  amount: z.number(),
  finalAmount: z.number(),
  address: addressSchema,
  paymentType: z.string(),
  promo: z.string().optional(),
  donationAmount: z.number(),
  deliveryCharge: z.number(),
  vgmAmount: z.number(),
  orderId: z.string(),
  createdAt: z.string(),
  suborderAllocated: z.boolean(),
  circle: z.string(),
  subOrders: z.array(subOrderSchema),
});

export type SuccessResponseType = z.infer<typeof dataSchema>;
