import { Schema, model } from "mongoose";
import { ICoupon } from "./manager.interface";

const CouponSchema = new Schema<ICoupon>({
  coupon: { type: String, require: [true, "Coupon needed"], unique: true },
  discountPercentage: {
    type: Number,
    required: [true, "Discount Percentage needed"],
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Coupon = model<ICoupon>("Coupon", CouponSchema);
