import express from "express";
import {
  createFlowerProductValidationSchema,
  updateFlowerProductValidationSchema,
} from "./flower.validation";
import { FlowerControllers } from "./flower.controller";
import validateRequest from "../../middleware/validateRequest";

const router = express.Router();

router.get("/", FlowerControllers.getAllFlower);

router.post(
  "/add-flower",
  validateRequest(createFlowerProductValidationSchema),
  FlowerControllers.addFlower
);

router.put(
  "/update-flower/:flowerId",
  validateRequest(updateFlowerProductValidationSchema),
  FlowerControllers.updateFlower
);

router.delete("/delete-flower/:flowerId", FlowerControllers.deleteFlower);

router.delete("/bulkDeleteFlowerflower", FlowerControllers.bulkDeleteFlower);

export const FlowerCrudRoutes = router;
