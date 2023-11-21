// userController.ts

import { Request, Response } from "express";
import { User } from "../models/User";
import { UserService } from "../services/UserService";

export class UserController {
  private userService = new UserService();

  createUser = (req: Request, res: Response) => {
    const newUser = this.userService.create(req.body as User);
    res.json(newUser);
  };

  getUser = (req: Request, res: Response) => {
    // Logic for retrieving a user
    const user = this.userService.getById(req.params.id);
    res.status(200).send(user);
  };

  updateUser = (req: Request, res: Response) => {
    // Logic for updating a user
    res.status(200).send("User updated");
  };

  deleteUser = (req: Request, res: Response) => {
    // Logic for deleting a user
    res.status(200).send("User deleted");
  };
}
