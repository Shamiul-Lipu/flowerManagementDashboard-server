import { z } from "zod";

export const createFlowerProductValidationSchema = z.object({
  name: z.string(),
  description: z.string(),
  uses: z.string(),
  price: z.number(),
  quantity: z.number(),
  bloomDate: z.string(),
  color: z.string(),
  category: z.string(),
  fragrance: z.string(),
  size: z.number(),
  bloomingSeason: z.string(),
  origin: z.string(),
  rating: z.number(),
});
