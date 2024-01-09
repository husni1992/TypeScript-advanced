// Using type predicates for user-defined type guards/ custom type guard functions
export class UserModel {
  id: string;
  name: string;
  email: number;

  // Validate if input is of type UserModel
  static isUser(input: any): input is UserModel {
    return (
      typeof input.id === "string" &&
      typeof input.name === "string" &&
      typeof input.age === "number"
    );
  }
}

export class UserController {
  private repo: any;

  // data coming in from endpoints
  createUser(input: any) {
    // validate
    if (!UserModel.isUser(input)) {
      throw new Error("Invalid user");
    }

    // infer input as UserModel
  }
}

export {};
