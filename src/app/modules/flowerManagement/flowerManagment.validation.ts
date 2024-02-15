import { z } from "zod";

export const createFlowerSaleSchema = z.object({
  sellerUserId: z.string().optional(),
  productId: z.string(),
  saleDate: z.string(),
  buyer: z.string(),
  quantitySold: z.number().optional(),
  totalAmount: z.number().optional(),
});
