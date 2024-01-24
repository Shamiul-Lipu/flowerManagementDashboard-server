import express from "express";
import { createUserValidationSchema } from "../user/user.validation";
import validateRequest from "../../middleware/validateRequest";
import { AuthControllers } from "./auth.controller";
import { loginValidationSchema } from "./auth.validation";

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

export const AuthRoutes = router;
