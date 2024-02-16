import express from "express";
import auth from "../../middleware/simpleAuth";
import { ManagerControllers } from "./manager.controller";
import validateRequest from "../../middleware/validateRequest";
import { createCouponValidationSchema } from "./manager.validation";
import { USER_ROLE } from "../user/user.interface";

const router = express.Router();

router.post(
  "/create-coupon",
  auth(USER_ROLE.manager),
  validateRequest(createCouponValidationSchema),
  ManagerControllers.createCoupon
);

router.get("/get-coupon", ManagerControllers.getCoupon);

export const ManagerRoutes = router;
