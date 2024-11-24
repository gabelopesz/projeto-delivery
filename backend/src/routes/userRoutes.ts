import { Router } from "express";
import { UserController } from "../controllers/UserController";

const router = Router();
const userController = new UserController();

// Rota POST /users
router.post("/users", async (req, res) => {
  try {
    await userController.create(req, res);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

// Rota GET /users
router.get("/users", async (req, res) => {
  try {
    await userController.list(req, res);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

export default router;
