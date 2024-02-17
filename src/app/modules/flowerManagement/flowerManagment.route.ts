import express from "express";
import { FlowerManagmentControllers } from "./flowerManagment.controller";
import validateRequest from "../../middleware/validateRequest";
import { createFlowerSaleSchema } from "./flowerManagment.validation";
import auth from "../../middleware/simpleAuth";
import { USER_ROLE } from "../user/user.interface";

const router = express.Router();

router.post(
  "/create-sales",
  validateRequest(createFlowerSaleSchema),
  FlowerManagmentControllers.salesManagement
);

router.get(
  "/lastWeeksales",
  auth(USER_ROLE.salesman, USER_ROLE.manager, USER_ROLE.member),
  FlowerManagmentControllers.lastWeekSalesHistory
);

router.get(
  "/todaysSalesHistory",
  auth(USER_ROLE.salesman, USER_ROLE.manager, USER_ROLE.member),
  FlowerManagmentControllers.todaysSalesHistory
);

router.get(
  "/monthAndYearlySalesHistory/:year",
  auth(USER_ROLE.salesman, USER_ROLE.manager, USER_ROLE.member),
  FlowerManagmentControllers.monthAndYearlySalesHistory
);

router.get(
  "/memberPurchesPoints",
  auth(USER_ROLE.member),
  FlowerManagmentControllers.memberPurchesPoints
);

router.get(
  "/getMyPurchesHistory",
  auth(USER_ROLE.member, USER_ROLE.salesman),
  FlowerManagmentControllers.getMyPurchesHistory
);

export const FlowerManagmentRoutes = router;
