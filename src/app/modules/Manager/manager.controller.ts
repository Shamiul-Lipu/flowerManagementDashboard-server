import catchAsync from "../../utils/catchAsync";
import { ManagerServices } from "./manager.service";

const createCoupon = catchAsync(async (req, res) => {
  const result = await ManagerServices.createCoupon(req.body, req.user);

  res.json({
    success: true,
    statusCode: 201,
    message: "Coupon successfully",
    data: result,
  });
});

const getCoupon = catchAsync(async (req, res) => {
  const result = await ManagerServices.getCoupon();

  res.json({
    success: true,
    statusCode: 201,
    message: "Coupon retrived successfully",
    data: result,
  });
});

export const ManagerControllers = { createCoupon, getCoupon };
