import express from "express";
import { createUserValidationSchema } from "../user/user.validation";
import validateRequest from "../../middleware/validateRequest";
import { AuthControllers } from "./auth.controller";
import {
  loginValidationSchema,
  refreshTokenValidationSchema,
} from "./auth.validation";
import { USER_ROLE } from "../user/user.interface";
import auth from "../../middleware/simpleAuth";

const router = express.Router();

router.post(
  "/registerMember",
  validateRequest(createUserValidationSchema),
  AuthControllers.registerMember
);

router.post(
  "/create-salesmanOrManager",
  auth(USER_ROLE.manager),
  validateRequest(createUserValidationSchema),
  AuthControllers.createSalesmanOrManager
);

router.post(
  "/login",
  validateRequest(loginValidationSchema),
  AuthControllers.loginUser
);

router.post(
  "/refresh-token",
  validateRequest(refreshTokenValidationSchema),
  AuthControllers.refreshToken
);

export const AuthRoutes = router;
