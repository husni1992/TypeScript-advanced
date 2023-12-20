export abstract class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  private readonly internalMessage?: string;
  private readonly innerError?: Error;

  constructor(
    message: string,
    statusCode: number,
    internalMessage?: string,
    isOperational: boolean = true,
    error?: Error,
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.internalMessage = internalMessage;
    this.isOperational = isOperational;
    this.innerError = error;

    Error.captureStackTrace(this);

    // Log the error details immediately upon creation or throw the error object where it can be logged.
    this.logDetailedError();
  }

  logDetailedError(): void {
    console.error(this);

    if (this.internalMessage) {
      console.log({ internalMessage: this.internalMessage });
    }

    if (this.innerError) {
      console.error("Inner error details", this.innerError);
    }
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
