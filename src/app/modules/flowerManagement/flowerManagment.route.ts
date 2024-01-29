import express from "express";
import { FlowerManagmentControllers } from "./flowerManagment.controller";
import validateRequest from "../../middleware/validateRequest";
import { createFlowerSaleSchema } from "./flowerManagment.validation";
import auth from "../../middleware/simpleAuth";

const router = express.Router();

router.post(
  "/create-sales",
  auth(),
  validateRequest(createFlowerSaleSchema),
  FlowerManagmentControllers.salesManagement
);

router.get(
  "/lastWeeksales",
  auth(),
  FlowerManagmentControllers.lastWeekSalesHistory
);

router.get(
  "/todaysSalesHistory",
  auth(),
  FlowerManagmentControllers.todaysSalesHistory
);

router.get(
  "/monthAndYearlySalesHistory/:year",
  auth(),
  FlowerManagmentControllers.monthAndYearlySalesHistory
);

export const FlowerManagmentRoutes = router;
