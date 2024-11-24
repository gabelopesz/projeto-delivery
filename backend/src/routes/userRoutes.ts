import { Router } from "express";
import { UserController } from "../controllers/UserController";

const userRoutes = Router();
const userController = new UserController();

// Rota para criar usuário
userRoutes.post("/", async (req, res, next) => {
  try {
    await userController.create(req, res);
  } catch (error) {
    next(error);
  }
});

export { userRoutes };
