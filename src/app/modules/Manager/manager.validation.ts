import { z } from "zod";

export const createCouponValidationSchema = z.object({
  coupon: z.string(),
  discountPercentage: z.number(),
});
