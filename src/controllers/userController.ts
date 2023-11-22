// userController.ts

import { Request, Response } from "express";
import { User, checkAvailableAuthLevelOfUser, isValidUserEmail } from "../models/User";
import { UserService } from "../services/UserService";

export class UserController {
  private userService = new UserService();

  createUser = (req: Request, res: Response) => {
    const [isValid, message] = isValidUserEmail(req.body.contact.email);
    if (!isValid) {
      res.status(400).json({ isValid, message });
      return;
    }

    const userStatus = req.body.status;

    if (!User.isValidStatus(userStatus)) {
      res.status(400).send("Invalid status!");
      return;
    }

    // Create a new User instance
    const newUser = new User(req.body);

    if (!User.isUser(newUser)) {
      res.status(400).send("Invalid user data!");
      return;
    }

    const createdUser = this.userService.create(newUser);
    res.status(201).json(createdUser);
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

  addNewHobbies = (req: Request, res: Response) => {
    const user = this.userService.getById(req.params.id);
    if (!user) {
      res.status(400).send("User not found!");
      return;
    }

    const normalizedHobbies = this.userService.normalizeHobbiesInput(req.body.hobbies);
    user.hobbies.push(...normalizedHobbies);

    res.status(200).send("Hobbies updated!");
  };

  checkAvailableAuthLevelOfUser = (req: Request, res: Response) => {
    const result = checkAvailableAuthLevelOfUser(req.params.id);
    res.status(200).send(result);
  };
}
