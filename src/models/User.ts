import { UserRole } from "./Types";

export interface EmailContact {
  email: string;
}

export interface PhoneContact {
  // Optional property, Typescript's nullable types
  phoneNumber?: string;
}

// feature #10: Implementing Literal Types in TypeScript
type UserStatus = "ACTIVE" | "INACTIVE" | "PENDING";

// feature #2: Interface for User
export interface User {
  // feature 9#: Union types
  id: number | string;
  name: string;
  role: UserRole;
  // feature #9 Intersection types
  contact: EmailContact & PhoneContact;
  hobbies: string[];
  status: UserStatus;
}

// 2. Class implementing the User interface (demonstrates TypeScript's class and type annotation features)
export class User implements User {
  id: number | string;
  name: string;
  contact: EmailContact & PhoneContact;
  role: UserRole;
  hobbies: string[];

  constructor({ id, name, role, contact, hobbies }: User) {
    this.id = id;
    this.name = name;
    this.contact = contact;
    this.role = role;
    this.hobbies = hobbies;
  }

  // feature #7: Implement type guards for validating user inputs
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
   * // feature #7: User-defined type guard for UserStatus.
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
}

// feature #8. Tuples
export function isValidUserEmail(email: string): [boolean, string] {
  const isValid = email.includes("@"); // Simple email validation
  const message = isValid ? "Valid user email" : "Invalid user email";
  return [isValid, message];
}

// feature #6: Generic functions
export function getItems<T>(items: T[]): T[] {
  return items;
}
