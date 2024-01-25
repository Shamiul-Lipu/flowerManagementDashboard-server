import express from "express";
import { FlowerManagmentControllers } from "./flowerManagment.controller";
import validateRequest from "../../middleware/validateRequest";
import { createFlowerSaleSchema } from "./flowerManagment.validation";

const router = express.Router();

router.post(
  "/create-sales",
  validateRequest(createFlowerSaleSchema),
  FlowerManagmentControllers.salesManagement
);
router.get("/sales", FlowerManagmentControllers.salesHistory);

export const FlowerManagmentRoutes = router;
