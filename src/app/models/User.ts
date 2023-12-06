import { ContactInfo, IUser, UserRole, UserStatus } from "../../types/userTypes";

// 2. Class implementing the User interface (demonstrates TypeScript's class and type annotation features)
export class User implements IUser {
  constructor(
    public id: IUser["id"],
    public name: IUser["name"],
    public contact: IUser["contact"],
    public role: IUser["role"],
    public hobbies: IUser["hobbies"],
    public status: IUser["status"],
  ) {}

  // feature #7 Implement User-defined type guard for validating user inputs
  static isUser(obj: any): obj is User {
    return (
      typeof obj.id === "string" &&
      typeof obj.name === "string" &&
      typeof obj.contact.email === "string" &&
      typeof obj.contact.phoneNumber === "string" &&
      Object.values(UserRole).includes(obj.role)
    );
  }

  /**
   * // feature #7 User-defined type guard for UserStatus.
   * This method checks if the given status is a valid UserStatus.
   * If it returns true, TypeScript infers that the status is of type UserStatus within the scope it's used.
   * This helps in type narrowing, allowing for more type-safe code.
   *
   * Example:
   * if (User.isValidStatus(someStatus)) {
   *     // Here, TypeScript knows someStatus is of type UserStatus
   * }
   *
   * if we define return type as boolean at line 74, then
   * if (User.isValidStatus(someStatus)) {
   *     // Here, TypeScript does NOT know the specific type of someStatus
   *     // It could still be 'any'
   * }
   *
   * @param status - The status to be checked.
   * @returns A boolean indicating if the status is a valid UserStatus.
   */
  static isValidStatus(status: any): status is UserStatus {
    return ["active", "inactive", "pending"].includes(status);
  }

  // feature #8 Tuples are a typed array with a pre-defined length and types for each index
  static isValidUserEmail(email: string): [boolean, string] {
    const isValid = email.includes("@"); // Simple email validation
    const message = isValid ? "Valid user email" : "Invalid user email";
    return [isValid, message];
  }
}

// feature #10 Literal Types
// It enables string values as valid return types.
export function checkAvailableAuthLevelOfUser(id: string): "READ" | "WRITE" | "DELETE" | "ADMIN" {
  return "READ";
}

// feature #6 Generic Functions
export function getItems<T>(items: T[]): T[] {
  return items;
}
