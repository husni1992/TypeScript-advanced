import { UserTypes } from "../../types/userTypes";
import { IGenericDatabase } from "../../data/interfaces/IGenericDatabase";
import { GenericPartialType, RequireAtLeastOne } from "../../types";
import { User } from "../models/User";
import { InvalidUserDataError, UserNotFoundError } from "../../errors";

/**
 * feature #3 Class is a blueprint for creating objects
 * Service class for user-related operations, extending GenericService
 */
export class UserService {
  protected repository: IGenericDatabase<UserTypes.IUser>;

  constructor(repository: IGenericDatabase<UserTypes.IUser>) {
    this.repository = repository;
  }

  async create(item: any): Promise<UserTypes.IUser> {
    if (!User.isUser(item)) {
      throw new InvalidUserDataError();
    }
    // feature #10 Type Guards: If this place is reached, the newUser is verified through a type guard function, and it is of type UserTypes.IUser

    const [isValidEmailAddress, message] = User.isValidUserEmail(item.contact.email);
    if (!isValidEmailAddress) {
      throw new Error(message);
    }

    const userStatus = item.status;
    const isValidStatus = User.isValidStatus(userStatus);
    if (!isValidStatus) {
      throw new InvalidUserDataError(["status"]);
    }

    return this.repository.create(item);
  }

  async getById(id: string): Promise<UserTypes.IUser | undefined> {
    return this.repository.getById(id);
  }

  async update(
    id: string,
    item: GenericPartialType<UserTypes.IUser>,
  ): Promise<UserTypes.IUser | undefined> {
    const userFound = await this.getById(id);
    if (!userFound) {
      throw new UserNotFoundError(id);
    }

    if (item.status) {
      const isValidStatus = User.isValidStatus(item.status);
      if (!isValidStatus) {
        throw new InvalidUserDataError(["status"]);
      }
    }

    return this.repository.update(id, item);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findByAttributes(
    attributes: RequireAtLeastOne<UserTypes.IUser>,
  ): Promise<UserTypes.IUser[]> {
    return this.repository.findByAttributes(attributes);
  }

  /* 
    // feature #1 Type annotation is used to specify the data type of a variable, parameter, or return value explicitly
    // feature #7 Union types allows for a value to be one of several types
    TypeScript will only allow an operation if it is valid for every member of the union. For example, 
    if you have the union string | string[], you can’t use methods that are only available on string.
    In below function, you can run 'toUpperCase' method only when it's a single string and not array.
    And the conditional check inside the method (using Array.isArray) is a typical pattern when working with Union Types.
  */
  normalizeHobbiesInput(input: string | string[]): string[] {
    if (!Array.isArray(input)) {
      console.log(input.toUpperCase());

      return [input];
    }

    return input;
  }

  // feature #1 Type annotation is used to specify the data type of a variable, parameter, or return value explicitly
  async addNewHobbies(id: string, hobbies: string[]): Promise<void> {
    await this.repository.updateOne(
      { id },
      {
        hobbies,
      },
    );
  }

  private getUserSensitiveInfo(id: string) {
    return {
      phoneNumber: "068887777",
      email: "foo@bar.com",
    };
  }

  private getUserNonSensitivePublicInfo(id: string) {
    return {
      status: "INACTIVE",
      hobbies: [""],
    };
  }

  private getUserPublicInfo(id: string) {
    return {
      name: "Husny Ahamed M.G",
    };
  }

  getUserInformation<T extends UserTypes.Role>(
    currentUserRole: T,
    idOfExpectedUser: string,
  ): UserTypes.UserInfoBasedOnRole<T> {
    if (currentUserRole === UserTypes.Role.Admin) {
      // Return admin level accessible information
      return this.getUserSensitiveInfo(idOfExpectedUser) as UserTypes.UserInfoBasedOnRole<T>;
    }

    if (currentUserRole === UserTypes.Role.User) {
      // Return user level accessible information
      return this.getUserNonSensitivePublicInfo(
        idOfExpectedUser,
      ) as UserTypes.UserInfoBasedOnRole<T>;
    }

    // Return public information
    return this.getUserPublicInfo(idOfExpectedUser) as UserTypes.UserInfoBasedOnRole<T>;
  }

  async findActiveUsers() {
    return this.repository.findByAttributes({ status: "ACTIVE" });
  }
}
