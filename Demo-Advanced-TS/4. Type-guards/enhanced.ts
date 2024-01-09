type UserType = {
  id: string;
  name: string;
  age: number;
};

class User {
  // if this is UserType
  static isUser(input: any): input is UserType {
    return (
      typeof input.id === "string" &&
      typeof input.name === "string" &&
      typeof input.age === "number"
    );
  }
}

class UserController {
  private repo: any;

  createUser(inputs: any) {
    // validate
    if (!User.isUser(inputs)) {
      throw new Error("Invalid user");
    }

    if (inputs.id) this.repo.createUser();
    // User
  }
}

export {};
