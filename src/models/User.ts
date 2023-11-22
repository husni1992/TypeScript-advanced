import { UserRole } from "./UserRole";

export interface EmailContact {
  email: string;
}

export interface PhoneContact {
  // Optional property, Typescript's nullable types
  phoneNumber?: string;
}

// feature #2: Interface for User
export interface User {
  // feature 9#: Union types
  id: number | string;
  name: string;
  role: UserRole;
  // feature 9# Intersection types
  contact: EmailContact & PhoneContact;
  hobbies: string[];
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
}

// feature #7: Implement type guards
export function isUser(obj: any): obj is User {
  return (
    (obj instanceof User && typeof obj.id === "number") ||
    (typeof obj.id === "string" &&
      typeof obj.name === "string" &&
      typeof obj.contact.email === "string" &&
      typeof obj.contact.phoneNumber === "string" &&
      Object.values(UserRole).includes(obj.role))
  );
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
