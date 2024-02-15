import { Schema, model } from "mongoose";
import { ICoupon } from "./manager.interface";

const CouponSchema = new Schema<ICoupon>({
  coupon: { type: String, require: [true, "Coupon needed"], unique: true },
});

export const Coupon = model<ICoupon>("Coupon", CouponSchema);
