import { Request, Response, NextFunction } from "express";
import { mockUser } from "../mocks/userMocks";

export function authUser(req: Request, _: Response, next: NextFunction) {
  // TODO: currently this is using mockUser, ideally we can use JWT for user auth
  req.currentUser = mockUser;
  next();
}
