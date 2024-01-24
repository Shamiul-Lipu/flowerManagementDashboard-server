import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { FlowerCRUDRoutes } from "../modules/flowerCRUD/flower.route";

const router = Router();

const moduleRoutes = [
  { path: "/auth", route: AuthRoutes },
  { path: "/flowers", route: FlowerCRUDRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
