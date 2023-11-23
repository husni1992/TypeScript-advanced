import { Request, Response } from "express";
import { User, checkAvailableAuthLevelOfUser, isValidUserEmail } from "../models/User";
import { UserService } from "../services/UserService";
import { MockCrudDatabase } from "../services/Database";

export class UserController {
  private dbInstance = new MockCrudDatabase<User>();
  private userService = new UserService(this.dbInstance);

  createUser = async (req: Request, res: Response) => {
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

    const createdUser = await this.userService.create(newUser);
    res.status(201).json(createdUser);
  };

  getUser = async (req: Request, res: Response) => {
    // Logic for retrieving a user
    const user = await this.userService.getById(req.params.id);
    res.status(200).send(user);
  };

  updateUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, status } = req.body;
      await this.userService.update(id, { id, name, status });

      res.status(200).send("User updated");
    } catch (err) {}
  };

  deleteUser = async (req: Request, res: Response) => {
    // Logic for deleting a user
    res.status(200).send("User deleted");
  };

  addNewHobbies = async (req: Request, res: Response) => {
    const user = await this.userService.getById(req.params.id);
    if (!user) {
      res.status(400).send("User not found!");
      return;
    }

    const nh = await this.userService.normalizeHobbiesInput(req.body.hobbies);
    user.hobbies.push(...nh);

    res.status(200).send("Hobbies updated!");
  };

  checkAvailableAuthLevelOfUser = (req: Request, res: Response) => {
    const result = checkAvailableAuthLevelOfUser(req.params.id);
    res.status(200).send(result);
  };
}
