import express from "express";
import {
  createFlowerProductValidationSchema,
  updateFlowerProductValidationSchema,
} from "./flower.validation";
import { FlowerControllers } from "./flower.controller";
import validateRequest from "../../middleware/validateRequest";
import auth from "../../middleware/simpleAuth";
import { USER_ROLE } from "../user/user.interface";

const router = express.Router();

router.get("/", FlowerControllers.getAllFlower);

router.post(
  "/add-flower",
  auth(USER_ROLE.manager),
  validateRequest(createFlowerProductValidationSchema),
  FlowerControllers.addFlower
);

router.put(
  "/update-flower/:flowerId",
  auth(USER_ROLE.manager),
  validateRequest(updateFlowerProductValidationSchema),
  FlowerControllers.updateFlower
);

router.put(
  "/delete-flower/:flowerId",
  auth(USER_ROLE.manager),
  FlowerControllers.deleteFlower
);

router.put(
  "/bulkDeleteFlowerflower",
  auth(USER_ROLE.manager),
  FlowerControllers.bulkDeleteFlower
);

export const FlowerCrudRoutes = router;
