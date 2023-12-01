import { Request, Response } from "express";
import { User, checkAvailableAuthLevelOfUser } from "../models/User";
import { UserService } from "../services/UserService";
import { MockCrudDatabase } from "../../data/Database";
import { RequireRole } from "../../decorators/RequireRoleAuth";
import { UserRole } from "../../types/userTypes";

export class UserController {
  private mockDB = new MockCrudDatabase<User>();
  private userService = new UserService(this.mockDB);

  createUser = async (req: Request, res: Response) => {
    const [isValidEmailAddress, message] = User.isValidUserEmail(req.body.contact.email);
    if (!isValidEmailAddress) {
      res.status(400).json({ isValid: isValidEmailAddress, message });
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
    const { id } = req.params;
    const { name, status } = req.body;
    await this.userService.update(id, { name, status });

    res.status(200).send("User updated");
  };

  @RequireRole(UserRole.Admin)
  async deleteUser(req: Request, res: Response): Promise<void> {
    // Logic for deleting a user
    res.status(200).send("User deleted");
  }

  addNewHobbies = async (req: Request, res: Response) => {
    const normalizedHobbies = this.userService.normalizeHobbiesInput(req.body.hobbies);
    await this.userService.addNewHobbies(req.params.id, normalizedHobbies);

    res.status(200).send("Hobbies updated!");
  };

  getUserData = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = this.userService.getUserInformation(req.currentUser.role, id);

    res.send(result);
  };

  checkAvailableAuthLevelOfUser = (req: Request, res: Response) => {
    const result = checkAvailableAuthLevelOfUser(req.params.id);
    res.status(200).send(result);
  };
}
