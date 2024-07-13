import * as z from "zod";

const StatusSchema = z.object({
  status: z.string(),
  time: z.string(),
  message: z.string(),
});

const AddressSchema = z.object({
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

const SubOrderSchema = z.object({
  subOrderId: z.string().uuid(),
  productId: z.string(),
  division: z.string().optional(),
  variantMrp: z.number().optional(),
  variantPrice: z.number(),
  slug: z.string(),
  variantId: z.string(),
  totalPromoDiscount: z.number().optional(),
  promoDiscount: z.number().optional(),
  discount: z.number().optional(),
  quantity: z.number().positive(),
  finalPrice: z.number(),
  price: z.number(),
  gst: z.number().optional(),
  isIgst: z.boolean().optional(),
  igst: z.number().optional(),
  cgst: z.number().optional(),
  sgst: z.number().optional(),
  igstRate: z.number().optional(),
  cgstRate: z.number().optional(),
  sgstRate: z.number().optional(),
  status: z.array(StatusSchema),
  invoiceDate: z.string().optional(),
  invoiceNumber: z.string().optional(),
  store: z.string().optional(),
  awbNumber: z.string().optional(),
  refNumber: z.string().optional(),
  deliveryPartner: z.string().optional(),
  refund: z.any().optional(),
  taxAmount: z.number().optional(),
  deliveryDate: z.string().optional(),
  url: z.string().url().optional(),
  title: z.string().optional(),
  size: z.string().optional(),
  color: z.string().optional(),
  latestStatusCode: z.string().optional(),
  latestStatusMessage: z.string().optional(),
});

const OrderSchema = z.object({
  userId: z.string().uuid(),
  email: z.string().email(),
  phone: z.string().optional(),
  subOrders: z.array(SubOrderSchema),
  amount: z.number(),
  finalAmount: z.number(),
  address: AddressSchema,
  paymentType: z.string(),
  promo: z.string().optional(),
  donationAmount: z.number().nonnegative(),
  deliveryCharge: z.number().nonnegative(),
  orderId: z.string(),
  circle: z.string(),
  discount: z.number().optional(),
  createdAt: z.string().optional(),
});

const SubOrderSchemaAlt = z.object({
  subOrderId: z.string(),
  productId: z.string(),
  slug: z.string(),
  variantId: z.string(),
  discount: z.number(),
  quantity: z.number(),
  finalPrice: z.number(),
  price: z.number(),
  variantPrice: z.number(),
  offerPrice: z.number().optional(),
  gst: z.number(),
  status: z.array(StatusSchema),
  invoiceDate: z.string(),
  invoiceNumber: z.string(),
  store: z.string(),
  awbNumber: z.string(),
  refNumber: z.string(),
  deliveryPartner: z.string(),
  refund: z.any(),
  taxAmount: z.number(),
  imageURL: z.string().optional(),
  name: z.string().optional(),
  color: z.string(),
  size: z.string(),
  categories: z.array(z.string()).optional(),
  gender: z.string().optional(),
});

const DataSchema = z.object({
  userId: z.string(),
  email: z.string().email(),
  phone: z.string(),
  razorpayOrderId: z.string().optional(),
  razorpayPaymentId: z.string().optional(),
  amount: z.number(),
  finalAmount: z.number(),
  address: AddressSchema,
  paymentType: z.string(),
  promo: z.string().optional(),
  donationAmount: z.number(),
  deliveryCharge: z.number(),
  vgmAmount: z.number().optional(),
  orderId: z.string(),
  createdAt: z.string(),
  suborderAllocated: z.boolean().optional(),
  circle: z.string(),
  subOrders: z.array(SubOrderSchemaAlt),
});

const CancelOrderPayloadSchema = z.object({
  subOrderId: z.string(),
  Status: z.literal("109"),
  orderId: z.string(),
});

export const CancelformSchema = z.object({
  reasonForCancellation: z.enum(
    [
      "Delay in delivery",
      "Found better discount",
      "Want to modify order",
      "Cancelling due to extra charges",
      "Ordered by mistake",
      "Other reasons",
    ],
    {
      required_error: "Please select a reason for cancellation.",
    }
  ),
  problemDetails: z.string().min(10, {
    message: "Please share more about the problem (at least 10 characters).",
  }),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must give consent to proceed.",
  }),
});

const OmsStatusPushPayloadSchema = z.object({
  cancelFormData: CancelformSchema,
  circle: z.string(),
  subOrderId: z.string(),
  status: z.literal("109"),
});

export const CancelOrderResponseSchema = z.union([
  z.literal("Success"),
  z.literal("OK"),
  z.literal("Fail"),
]);

export type CancelOrderPayload = z.infer<typeof CancelOrderPayloadSchema>;
export type OmsStatusPushPayload = z.infer<typeof OmsStatusPushPayloadSchema>;
export type CancelFormData = z.infer<typeof CancelformSchema>;
export type UserOrder = z.infer<typeof OrderSchema>;
export type SubOrder = z.infer<typeof SubOrderSchema>;
export type SuccessOrder = z.infer<typeof DataSchema>;
