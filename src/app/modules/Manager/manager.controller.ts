import catchAsync from "../../utils/catchAsync";
import { ManagerServices } from "./manager.service";

const createCoupon = catchAsync(async (req, res) => {
  const result = await ManagerServices.createCoupon(req.body);

  res.json({
    success: true,
    statusCode: 201,
    message: "Coupon successfully",
    data: result,
  });
});

export const ManagerControllers = { createCoupon };
