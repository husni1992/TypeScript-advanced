// userController.ts

import { Request, Response } from "express";
import { User, isUser, isValidUserEmail } from "../models/User";
import { UserService } from "../services/UserService";

export class UserController {
  private userService = new UserService();

  createUser = (req: Request, res: Response) => {
    const [isValid, message] = isValidUserEmail(req.body.email);
    if (!isValid) {
      res.status(400).json({ isValid, message });
    }

    // Create a new User instance
    const newUser = new User(req.body);

    const createdUser = this.userService.create(newUser);

    if (isUser(createdUser)) {
      res.status(201).json(createdUser);
    } else {
      res.status(400).send("Invalid user data");
    }
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
