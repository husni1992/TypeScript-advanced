import { AppError } from "./AppError";
import { ErrorStatusCodes } from "./HttpStatusCodes";

export class UnauthorizedError extends AppError {
  constructor(privateMessage?: string) {
    super("Forbidden action", ErrorStatusCodes.FORBIDDEN, privateMessage);
  }

  serializeErrors(): { message: string; statusCode: number }[] {
    return [{ message: this.message, statusCode: this.statusCode }];
  }
}
