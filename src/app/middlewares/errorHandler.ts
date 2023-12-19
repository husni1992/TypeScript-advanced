import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  // If the error type is not recognized, send a generic response
  // TODO: use logger
  console.error(err); // Log the error for debugging purposes
  return res.status(500).send({ errors: [{ message: "Something went wrong!" }] });
}

export default errorHandler;
