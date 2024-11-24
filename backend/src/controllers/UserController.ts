import { Request, Response } from "express";
import { CreateUserUseCase } from "../usecases/User/CreateUserUseCase";

export class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, password } = req.body;

      const createUser = new CreateUserUseCase();

      const user = await createUser.execute({
        name,
        email,
        password,
      });

      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }
}
