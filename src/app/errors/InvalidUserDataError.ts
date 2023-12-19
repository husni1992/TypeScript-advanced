import { AppError } from "./AppError";
import { ErrorStatusCodes } from "./StatusCodes";

export class InvalidUserData extends AppError {
  constructor(apiName: string) {
    super(`Invalid user data in api ${apiName}`, ErrorStatusCodes.BAD_REQUEST);
  }

  serializeErrors(): { message: string; statusCode: number }[] {
    return [{ message: this.message, statusCode: this.statusCode }];
  }
}
