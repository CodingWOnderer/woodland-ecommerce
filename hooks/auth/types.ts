import { z } from "zod";

const UserSchema = z.object({
  uid: z.string(),
  phone: z.string(),
  email: z.string(),
});

export type User = z.infer<typeof UserSchema>;
