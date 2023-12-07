// feature #20 Namespaces: helps in organizing code into named groups, making it easier to manage and use in larger applications
export namespace UserTypes {
  interface EmailContact {
    email: string;
  }

  interface PhoneContact {
    // feature #11 Optional property, Typescript's nullable types
    phoneNumber?: string;
  }

  // feature #9 Intersection types
  type ContactInfo = EmailContact & PhoneContact;

  // feature #12 Type alias
  // Type Aliases allow defining types with a custom name (an Alias). In this example it's UserStatus
  type Status = "ACTIVE" | "INACTIVE" | "PENDING";

  /**
   * feature #4: Enums is a way to define a set of named constants.
   * Unlike interfaces or types, Enums can be used as regular objects at runtime.
   * This 'UserRole' enum defines distinct user roles, accessible for runtime operations like
   * validation or iteration with 'Object.values()'.
   */
  export enum Role {
    Admin = "ADMIN",
    User = "USER",
    Guest = "GUEST",
  }

  // feature #2 Interface for User
  export interface IUser {
    // feature #17 Utility Type "readonly": makes the properties of the constructed type cannot be reassigned
    readonly id: string;
    name: string;
    role: Role;
    contact: ContactInfo;
    hobbies: string[];
    status: Status;
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
  // feature #21 Advanced Generics
  export type UserInfoBasedOnRole<T extends Role> = T extends Role.Admin
    ? PrivateInfo
    : T extends Role.User
      ? PublicInfo
      : OtherInfo;
}
