import { AppError } from "./AppError";
import { ErrorStatusCodes } from "./HttpStatusCodes";

export class InvalidUserDataError extends AppError {
  constructor(invalidFields?: string[], privateMessage?: string) {
    super(
      `Invalid user data received${invalidFields?.length ? `: ${invalidFields.join(", ")}` : "."}`,
      ErrorStatusCodes.BAD_REQUEST,
      privateMessage,
    );
  }

  serializeErrors(): { message: string; statusCode: number }[] {
    return [{ message: this.message, statusCode: this.statusCode }];
  }
}
