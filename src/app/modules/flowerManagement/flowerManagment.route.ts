import express from "express";
import { FlowerManagmentControllers } from "./flowerManagment.controller";
import validateRequest from "../../middleware/validateRequest";
import { createFlowerSaleSchema } from "./flowerManagment.validation";
import auth from "../../middleware/simpleAuth";
import { USER_ROLE } from "../user/user.interface";

const router = express.Router();

router.post(
  "/create-sales",
  auth(USER_ROLE.salesman),
  validateRequest(createFlowerSaleSchema),
  FlowerManagmentControllers.salesManagement
);

router.get(
  "/lastWeeksales",
  auth(USER_ROLE.salesman, USER_ROLE.manager),
  FlowerManagmentControllers.lastWeekSalesHistory
);

router.get(
  "/todaysSalesHistory",
  auth(USER_ROLE.salesman, USER_ROLE.manager),
  FlowerManagmentControllers.todaysSalesHistory
);

router.get(
  "/monthAndYearlySalesHistory/:year",
  auth(USER_ROLE.salesman, USER_ROLE.manager),
  FlowerManagmentControllers.monthAndYearlySalesHistory
);

export const FlowerManagmentRoutes = router;
