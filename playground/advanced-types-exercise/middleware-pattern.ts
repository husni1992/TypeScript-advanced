// Define the hybrid type for the middleware
interface LoggingMiddleware {
  (req: Express.Request, res: Express.Response, next: any): void;
  setLogLevel(level: string): void;
}

function createLoggingMiddleware(): LoggingMiddleware {
  const middleware = function (req: Express.Request, res: Express.Response, next: any): void {};

  middleware.setLogLevel = function (level: string) {
    console.log("Foo");
  };

  return middleware;
}

function createLoggingMiddleware2() {
  const middleware = function (
    req: Express.Request,
    res: Express.Response,
    next: any,
  ): void {} as LoggingMiddleware;

  return {
    middleware,
    setLogLevel(level: string) {
      console.log("Foo");
    },
  };
}

const logger = createLoggingMiddleware();
logger.setLogLevel("L");

const logger2 = createLoggingMiddleware2();
logger2.middleware; // pass this inside app.use
logger2.setLogLevel("R");
