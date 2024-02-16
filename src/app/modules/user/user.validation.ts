import { z } from "zod";

export const createUserValidationSchema = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.string().optional(),
  purchesPoints: z.number().optional(),
});
