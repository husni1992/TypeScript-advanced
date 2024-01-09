import { Request, Response } from "express";
import { User, checkAvailableAuthLevelOfUser } from "../models/User";
import { UserService } from "../services/UserService";
import { MockUserDatabase } from "../../data/repositories/MockUserDatabase";
import { RequireAuthRole } from "../../decorators/requireAuthRole";
import { UserTypes } from "../../types/userTypes";
import { featureFlagInstance } from "../../config/featureFlags";

export class UserController {
  private mockDB = new MockUserDatabase<User>();
  private userService = new UserService(this.mockDB);

  createUser = async (req: Request, res: Response) => {
    const { name, role, contact, hobbies, status } = req.body;
    const newUser = await this.userService.create({ name, role, contact, hobbies, status });

    res.status(200).json(newUser);
  };

  getUser = async (req: Request, res: Response) => {
    // Logic for retrieving a user
    const user = await this.userService.getById(req.params.id);

    res.status(200).send(user);
  };

  updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, role, contact, hobbies, status } = req.body;
    await this.userService.update(id, { name, role, contact, hobbies, status });

    res.status(200).send("User updated");
  };

  @RequireAuthRole(UserTypes.Role.Admin)
  // @loggedMethod()
  deleteUser(req: Request, res: Response) {
    console.log({ req: req.params });

    res.status(200).send("Deleted!!");
  }

  addNewHobbies = async (req: Request, res: Response) => {
    if (!featureFlagInstance.getFlag("ENABLE_MODIFYING_HOBBIES").enabled) {
      res.status(400).send("Feature B is not enabled!");
      return;
    }

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

  getActiveUsers = async (req: Request, res: Response) => {
    const activeUsers = await this.userService.findActiveUsers();

    res.send(activeUsers).status(200);
  };
}
