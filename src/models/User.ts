import { UserRole } from "./UserRole";

// feature #2: Interface for User
interface IUser {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  // Optional property, Typescript's nullable types
  phoneNumber?: string;
}

// 2. Class implementing the IUser interface (demonstrates TypeScript's class and type annotation features)
class User implements IUser {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  phoneNumber?: string;

  constructor({ id, name, email, role, phoneNumber }: IUser) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
    this.phoneNumber = phoneNumber;
  }

  // Example of a method (demonstrates TypeScript's method feature)
  greet() {
    return `Hello, my name is ${this.name}`;
  }
}

// feature #7: Implement type guards
function isUser(obj: any): obj is User {
  return (
    obj instanceof User &&
    typeof obj.id === "number" &&
    typeof obj.name === "string" &&
    typeof obj.email === "string" &&
    typeof obj.phoneNumber === "string" &&
    Object.values(UserRole).includes(obj.role)
  );
}

// feature #8. Tuples in TypeScript
function isValidUserEmail(email: string): [boolean, string] {
  const isValid = email.includes("@"); // Simple email validation
  const message = isValid ? "Valid user email" : "Invalid user email";
  return [isValid, message];
}

function getItems<T>(items: T[]): T[] {
  return items;
}

export { IUser, User, isUser, isValidUserEmail };
