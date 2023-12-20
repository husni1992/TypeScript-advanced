// feature #7 Union types allows for a value to be one of several types
// feature #12 Literal Types enable string values as valid return types
// feature Hybrid Types, the LoggingMiddleware interface is an example of Hybrid Type, acts both as a function and as an object

import { Request, Response, NextFunction } from "express";
type LogLevel = "DEBUG" | "INFO" | "WARNING" | "ERROR" | "FATAL" | "TRACE" | "EMERGENCY";


// Define the hybrid type for the middleware
interface LoggingMiddleware {
  (req: Request, res: Response, next: NextFunction): void;
  setLogLevel(level: LogLevel): void;
}

export function createLoggingMiddleware(): LoggingMiddleware {
  console.log("run: createLoggingMiddleware");

  let logLevel: LogLevel = "INFO"; // Default log level

  const middleware: LoggingMiddleware = function (
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    // Your logging logic here based on the logLevel
    console.log(`[${logLevel}] - Request received: ${req.method} ${req.path}`);
    next();
  };

  middleware.setLogLevel = function (level: LogLevel) {
    logLevel = level;
    console.log(`Logger level updated to ${level}`);
  };

  return middleware;
}

export const requestLogger = createLoggingMiddleware();
