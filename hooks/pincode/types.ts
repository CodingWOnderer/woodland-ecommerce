import * as z from "zod";

const DataSchema = z.object({
  pincode: z.number(),
  city: z.string(),
  state: z.string(),
  isCODServiceable: z.boolean(),
  isPrepaidServiceable: z.boolean(),
  isActive: z.boolean(),
});

export type PinCodeResponseSchema = ResponseModal<z.infer<typeof DataSchema>>;
