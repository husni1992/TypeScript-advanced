export abstract class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number, isOptional: boolean = true) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isOperational = isOptional;

    Error.captureStackTrace(this);
  }

  /**
   * Abstract method to serialize error information.
   * This method must be implemented by subclasses to format error details for responses.
   * It allows for consistent error handling across the application by providing
   * a uniform structure for error responses, eliminating the need for conditional checks
   * within the error handling middleware.
   */
  abstract serializeErrors(): { message: string; statusCode: number }[];
}
