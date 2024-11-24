import { Request, Response } from "express";
import { CreateProductUseCase } from "../usecases/Product/CreateProductUseCase";

export class ProductController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, price, description, categoryId } = req.body;

      const createProduct = new CreateProductUseCase();

      const product = await createProduct.execute({
        name,
        price,
        description,
        categoryId,
      });

      return res.status(201).json(product);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(400).json({ error: "Erro desconhecido" });
    }
  }
}
