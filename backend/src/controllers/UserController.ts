import { Request, Response } from "express";
import { UserRepository } from "../repositories/UserRepository";

export class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, password } = req.body;

      const user = UserRepository.create({ name, email, password });
      await UserRepository.save(user);

      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ message: "Error creating user", error });
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
    try {
      const users = await UserRepository.find();
      return res.json(users);
    } catch (error) {
      return res.status(400).json({ message: "Error fetching users", error });
    }
  }
}
