import { AppError } from "./AppError";
import { ErrorStatusCodes } from "./HttpStatusCodes";

export class UserNotFoundError extends AppError {
  constructor(id: string) {
    super(`User with id ${id} not found`, ErrorStatusCodes.NOT_FOUND);
  }

  serializeErrors(): { message: string; statusCode: number }[] {
    return [{ message: this.message, statusCode: this.statusCode }];
  }
}
