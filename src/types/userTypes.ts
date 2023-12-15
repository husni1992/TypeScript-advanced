// feature #14 Namespaces help in organizing code into named groups, making it easier to manage and use in larger applications
export namespace UserTypes {
  interface EmailContact {
    email: string;
  }

  interface PhoneContact {
    // feature #6 Nullable Types, Optional property
    phoneNumber?: string;
  }

  // feature #8 Intersection Types combines types into one by merging their properties and creating a new type.
  type ContactInfo = EmailContact & PhoneContact;

  // feature #12 Literal Types enable string values as valid return types.
  // feature #5 Type aliases are custom type definitions to simplify complex type signatures
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

  // feature #2 Interface is what defines the structure of an object by specifying the properties and methods it should have
  export interface IUser {
    // feature #13 Utility Types "readonly": makes the properties of the constructed type cannot be reassigned
    readonly id: string;
    // feature #1 Type annotation is used to specify the data type of a variable, parameter, or return value explicitly
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

  // feature #16 Conditional Types define types that are determined based on conditional logic, allowing for types to change based on the input types
  // feature #20 Advanced Generics enables more complex and flexible reusable code for multiple data types with type safety
  export type UserInfoBasedOnRole<T extends Role> = T extends Role.Admin
    ? PrivateInfo
    : T extends Role.User
      ? PublicInfo
      : OtherInfo;
}
