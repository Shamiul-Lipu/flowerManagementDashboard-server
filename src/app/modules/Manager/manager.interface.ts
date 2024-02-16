import { Types } from "mongoose";

export interface ICoupon {
  coupon: string;
  discountPercentage: number;
  createdBy?: Types.ObjectId;
}
