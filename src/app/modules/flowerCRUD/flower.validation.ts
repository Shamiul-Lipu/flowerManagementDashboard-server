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
  rating: z.number(),
  isSelectedForDelete: z.boolean().optional(),
});

export const updateFlowerProductValidationSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  uses: z.string().optional(),
  price: z.number().optional(),
  quantity: z.number().optional(),
  bloomDate: z.string().optional(),
  color: z.string().optional(),
  category: z.string().optional(),
  fragrance: z.string().optional(),
  size: z.number().optional(),
  bloomingSeason: z.string().optional(),
  rating: z.number().optional(),
  isSelectedForDelete: z.boolean().optional(),
});
