import { Request, Response, NextFunction } from "express";
import { mockUser } from "../mocks/userMocks";

export function authUser(req: Request, _: Response, next: NextFunction) {
  req.currentUser = {
    ...mockUser,
    isAuthenticated: req.headers["authenticated"] as string,
    userRole: req.headers["user-role"] as string,
  };
  next();
}
