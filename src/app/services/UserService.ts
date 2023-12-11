// feature #3 Class is a blueprint for creating objects

import { MockCrudDatabase } from "../../data/Database";
import { GenericDataService } from "./GenericDataService";
import { UserTypes } from "../../types/userTypes";

/**
 * Service class for user-related operations, extending GenericService
 */
export class UserService extends GenericDataService<UserTypes.IUser> {
  constructor(repository: MockCrudDatabase<UserTypes.IUser>) {
    super(repository);
  }

  /* 
    // feature #1 Type annotation: specifies what types of data to expect and provide.
    // feature #8 Union types
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

  // feature #1 Type annotation: specifies what types of data to expect and provide.
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
