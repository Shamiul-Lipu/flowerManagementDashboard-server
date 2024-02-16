import { Types } from "mongoose";
import { ICoupon } from "./manager.interface";
import { Coupon } from "./manager.model";

const createCoupon = async (
  payload: ICoupon,
  manager: Record<string, Types.ObjectId>
) => {
  payload.createdBy = manager.id;
  const result = await Coupon.create(payload);
  return result;
};

const getCoupon = async () => {
  const result = await Coupon.find();
  return result;
};

export const ManagerServices = { createCoupon, getCoupon };
