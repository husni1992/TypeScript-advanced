import { Request, Response, NextFunction } from "express";

function createLoggingMiddleware() {
  let logLevel: string = "INFO"; // Default log level

  const middleware = function (req: Request, res: Response, next: NextFunction): void {
    // Your logging logic here based on the logLevel
    console.log(`[${logLevel}] - Request received: ${req.method} ${req.path}`);
    next();
  };

  middleware.setLogLevel = function (level: string) {
    logLevel = level;
    console.log(`Logger level updated to ${level}`);
  };

  return middleware;
}

const logger = createLoggingMiddleware();
logger.setLogLevel("EMERGENCY");

export {};
