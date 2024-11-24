import { Router } from "express";
import { ProductController } from "../controllers/ProductController";

const productRoutes = Router();
const productController = new ProductController();

// Middleware para chamar a função assíncrona do controlador
productRoutes.post("/", async (req, res, next) => {
  try {
    await productController.create(req, res);
  } catch (error) {
    next(error); // Passa o erro para o middleware de erro do Express
  }
});

export { productRoutes };
