import express from "express";
import { createUserValidationSchema } from "../user/user.validation";
import validateRequest from "../../middleware/validateRequest";
import { AuthControllers } from "./auth.controller";
import {
  loginValidationSchema,
  refreshTokenValidationSchema,
} from "./auth.validation";

const router = express.Router();

router.post(
  "/register",
  validateRequest(createUserValidationSchema),
  AuthControllers.registerUser
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
