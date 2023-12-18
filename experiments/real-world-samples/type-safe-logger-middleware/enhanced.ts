import { Request, Response, NextFunction } from "express";

type LogLevel = "DEBUG" | "INFO" | "WARNING" | "ERROR" | "FATAL" | "TRACE" | "EMERGENCY";

// Define the hybrid type for the middleware
interface LoggingMiddleware {
  (req: Request, res: Response, next: NextFunction): void;
  setLogLevel(level: LogLevel): void;
}

function createLoggingMiddleware(): LoggingMiddleware {
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

const logger = createLoggingMiddleware();
logger.setLogLevel("EMERGENCY");

export {};
