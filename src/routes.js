import { Router } from "express";
import userController from "./controllers/userController.js";
import animalController from "./controllers/animalController.js";

const routes = Router();

routes.use("/users", userController);
routes.use("/animals", animalController);

export default routes;
