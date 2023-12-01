import { Request, Response } from "express";
import { UserRole } from "../types/userTypes";

// feature #15 Decorators enhance existing code with additional functionality at compile time.
export function RequireRole(requiredRole: UserRole) {
  return function (target: any, methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor | void {
    const originalMethod = descriptor.value;

    descriptor.value = function (req: Request, res: Response) {

      // verify if the req and res are the expected Express's props
      console.log("body" in req, "send" in res);
      if (!req || !req.currentUser) {
        throw new Error("User not authenticated");
      }

      if (req.currentUser.role !== requiredRole) {
        throw new Error("User does not have the required role");
      }

      // return originalMethod.apply(this, args);  // either way will work, but make the param for descriptor ""...args: any[]"
      return originalMethod.call(this, req, res);
    };

    return descriptor;
  };
}
