import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { FlowerCrudRoutes } from "../modules/flowerCrud/flower.route";
import { FlowerManagmentRoutes } from "../modules/flowerManagement/flowerManagment.route";

const router = Router();

const moduleRoutes = [
  { path: "/auth", route: AuthRoutes },
  { path: "/flowers", route: FlowerCrudRoutes },
  { path: "/flowerManagment", route: FlowerManagmentRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
