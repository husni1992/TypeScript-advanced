import { UserTypes } from "../../types/userTypes";

// 2. Class implementing the User interface (demonstrates TypeScript's class and type annotation features)
export class User implements UserTypes.IUser {
  constructor(
    public id: UserTypes.IUser["id"],
    public name: UserTypes.IUser["name"],
    public contact: UserTypes.IUser["contact"],
    public role: UserTypes.IUser["role"],
    public hobbies: UserTypes.IUser["hobbies"],
    public status: UserTypes.IUser["status"],
  ) {}

  // feature #10 Type Guards are Functions that check and narrow variable types, whether at runtime or compile time
  static isUser(obj: any): obj is User {
    return (
      typeof obj.name === "string" &&
      typeof obj.contact.email === "string" &&
      typeof obj.contact.phoneNumber === "string" &&
      Object.values(UserTypes.Role).includes(obj.role)
    );
  }

  /**
   * // feature #10 Type Guards are Functions that check and narrow variable types, whether at runtime or compile time
   * This method checks if the given status is a valid UserTypes.IUser["status"].
   * If it returns true, TypeScript infers that the status is of type UserTypes.IUser["status"] within the scope it's used.
   * This helps in type narrowing, allowing for more type-safe code.
   *
   * @param status - The status to be checked.
   * @returns A boolean indicating if the status is a valid UserTypes.IUser["status"].
   */
  static isValidStatus(status: string): status is UserTypes.IUser["status"] {
    const availableStatuses: UserTypes.IUser["status"][] = ["ACTIVE", "INACTIVE", "PENDING"];
    return availableStatuses.includes(status as UserTypes.IUser["status"]);
  }

  // feature #11 Tuples are a typed array with a pre-defined length and types for each index
  static isValidUserEmail(email: string): [boolean, string] {
    const isValid = email.includes("@"); // Simple email validation
    const message = isValid ? "Valid user email" : "Invalid user email";
    return [isValid, message];
  }
}

// feature #12 Literal Types enable string values as valid return types.
export function checkAvailableAuthLevelOfUser(id: string): "READ" | "WRITE" | "DELETE" | "ADMIN" {
  return "READ";
}

// feature #9 Generics enables reusable code for multiple data types with type safety
export function getItems<T>(items: T[]): T[] {
  return items;
}
