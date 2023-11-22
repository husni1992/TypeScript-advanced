// feature #3: Classes, UserService.ts

import { User } from "../models/User";
import { GenericDataService } from "./common/GenericService";

/**
 * Service class for user-related operations, extending GenericService
 */
export class UserService extends GenericDataService<User> {
  constructor() {
    super();
  }

  /*
    // feature 9#: Union types
    TypeScript will only allow an operation if it is valid for every member of the union. For example, 
    if you have the union string | string[], you can’t use methods that are only available on string.
    In below function, you can run 'toUpperCase' method only when it's a single string and not array
  */
  normalizeHobbiesInput(input: string | string[]): string[] {
    if (!Array.isArray(input)) {
      console.log(input.toUpperCase());

      return [input];
    }

    return input;
  }
}

export default UserService;
