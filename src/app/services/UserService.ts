// feature #3 Classes, UserService.ts

import { MockCrudDatabase } from "../../data/Database";
import { GenericDataService } from "./GenericService";
import { IUser, UserInfoBasedOnRole, UserRole } from "../../types/userTypes";

/**
 * Service class for user-related operations, extending GenericService
 */
export class UserService extends GenericDataService<IUser> {
  constructor(repository: MockCrudDatabase<IUser>) {
    super(repository);
  }

  /* 
    // feature 9# Union types
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

  async addNewHobbies(id: string, hobbies: string[]) {
    await this.repository.updateOne(
      { id },
      {
        $push: {
          hobbies,
        },
      }
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

  getUserInformation<T extends UserRole>(
    currentUserRole: T,
    idOfExpectedUser: string
  ): UserInfoBasedOnRole<T> {
    if (currentUserRole === UserRole.Admin) {
      // Return admin level accessible information
      return this.getUserSensitiveInfo(idOfExpectedUser) as UserInfoBasedOnRole<T>;
    }

    if (currentUserRole === UserRole.User) {
      // Return user level accessible information
      return this.getUserNonSensitivePublicInfo(idOfExpectedUser) as UserInfoBasedOnRole<T>;
    }

    // Return public information
    return this.getUserPublicInfo(idOfExpectedUser) as UserInfoBasedOnRole<T>;
  }
}
