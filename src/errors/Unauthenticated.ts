import { AppError } from "./AppError";
import { ErrorStatusCodes } from "./HttpStatusCodes";

export class UnauthenticatedError extends AppError {
  constructor(internalMessage?: string) {
    super("User not authenticated!", ErrorStatusCodes.UNAUTHORIZED, internalMessage);
  }

  serializeErrors(): { message: string; statusCode: number }[] {
    return [{ message: this.message, statusCode: this.statusCode }];
  }
}
