import express from "express";
import {
  createFlowerProductValidationSchema,
  updateFlowerProductValidationSchema,
} from "./flower.validation";
import { FlowerControllers } from "./flower.controller";
import validateRequest from "../../middleware/validateRequest";
import auth from "../../middleware/simpleAuth";

const router = express.Router();

router.get("/", auth(), FlowerControllers.getAllFlower);

router.post(
  "/add-flower",
  auth(),
  validateRequest(createFlowerProductValidationSchema),
  FlowerControllers.addFlower
);

router.put(
  "/update-flower/:flowerId",
  validateRequest(updateFlowerProductValidationSchema),
  FlowerControllers.updateFlower
);

router.put("/delete-flower/:flowerId", FlowerControllers.deleteFlower);

router.put("/bulkDeleteFlowerflower", FlowerControllers.bulkDeleteFlower);

export const FlowerCrudRoutes = router;
