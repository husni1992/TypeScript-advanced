// UserService.ts

import { User, IUser } from "../models/User";
import { GenericService } from "./common/GenericService";

/**
 * Service class for user-related operations, extending GenericService
 */
export class UserService extends GenericService<User> {
  constructor() {
    super();
  }
}

export default UserService;
