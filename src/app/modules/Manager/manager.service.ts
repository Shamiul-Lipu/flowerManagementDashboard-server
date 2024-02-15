import { ICoupon } from "./manager.interface";
import { Coupon } from "./manager.model";

const createCoupon = async (payload: ICoupon) => {
  const result = await Coupon.create(payload);
  return result;
};

export const ManagerServices = { createCoupon };
