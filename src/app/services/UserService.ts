import { UserTypes } from "../../types/userTypes";
import { IGenericDatabase } from "../../data/interfaces/IGenericDatabase";
import { GenericPartialType, RequireAtLeastOne } from "../../types";
import { UserNotFoundError } from "../../errors";

/**
 * feature #3 Class is a blueprint for creating objects
 * Service class for user-related operations, extending GenericService
 */
export class UserService {
  protected repository: IGenericDatabase<UserTypes.IUser>;

  constructor(repository: IGenericDatabase<UserTypes.IUser>) {
    this.repository = repository;
  }

  async create(item: UserTypes.IUser): Promise<UserTypes.IUser> {
    try {
      return this.repository.create(item);
    } catch (err) {
      // TODO: Refactor errors
      throw new Error("Failed creating record!");
    }
  }

  // feature #7 Union types allows for a value to be one of several types
  async getById(id: string): Promise<UserTypes.IUser | undefined> {
    // return this.items.find((item) => (item as any).id == id);
    try {
      return this.repository.getById(id);
    } catch (err) {
      throw new UserNotFoundError(id);
    }
  }

  async update(
    id: string,
    item: GenericPartialType<UserTypes.IUser>,
  ): Promise<UserTypes.IUser | undefined> {
    try {
      return this.repository.update(id, item);
    } catch (err) {
      throw new Error("Failed update!");
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.repository.delete(id);
      console.log("Successfully deleted!");
    } catch (err) {
      throw new Error("Delete failed!");
    }
  }

  async findByAttributes(
    attributes: RequireAtLeastOne<UserTypes.IUser>,
  ): Promise<UserTypes.IUser[]> {
    try {
      return this.repository.findByAttributes(attributes);
    } catch (err) {
      throw new Error("Failed getting item provided attributes!");
    }
  }

  // existing are below

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
        $push: {
          hobbies,
        },
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
