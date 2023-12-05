interface EmailContact {
  email: string;
}

interface PhoneContact {
  // feature #11 Optional property, Typescript's nullable types
  phoneNumber?: string;
}

// feature #9 Intersection types
export type ContactInfo = EmailContact & PhoneContact;

// feature #12 Type alias
// Type Aliases allow defining types with a custom name (an Alias). In this example it's UserStatus
export type UserStatus = "ACTIVE" | "INACTIVE" | "PENDING";

// feature #2 Interface for User
export interface IUser {
  // feature #17 Utility Type "readonly": makes the properties of the constructed type cannot be reassigned
  readonly id: string;
  name: string;
  role: UserRole;
  contact: ContactInfo;
  hobbies: string[];
  status: UserStatus;
}

/**
 * feature #4: Enums is a way to define a set of named constants.
 * Unlike interfaces or types, Enums can be used as regular objects at runtime.
 * This 'UserRole' enum defines distinct user roles, accessible for runtime operations like
 * validation or iteration with 'Object.values()'.
 */
export enum UserRole {
  Admin = "ADMIN",
  User = "USER",
  Guest = "GUEST",
}

type PrivateInfo = {
  phoneNumber: IUser["contact"]["phoneNumber"];
  email: IUser["contact"]["email"];
};

type PublicInfo = {
  status: IUser["status"];
  hobbies: IUser["hobbies"];
};

type OtherInfo = {
  name: IUser["name"];
};

// feature #14 Conditional types: Creating types that depend on other types or conditions
export type UserInfoBasedOnRole<T extends UserRole> = T extends UserRole.Admin
  ? PrivateInfo
  : T extends UserRole.User
    ? PublicInfo
    : OtherInfo;
