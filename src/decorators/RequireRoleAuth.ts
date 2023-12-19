import { Request, Response } from "express";
import { UserTypes } from "../types/userTypes";

// FIXME: fix this to work with both regular functions and arrow functions, read how to fix it
// feature #17 Decorators are functions that modify class, method, property, or parameter behavior and metadata at compile or runtime.
export function RequireRole(requiredRole: UserTypes.Role) {
  return function (
    target: Object,
    methodName: string,
    descriptor: PropertyDescriptor,
  ): PropertyDescriptor | void {
    const originalMethod = descriptor.value;

    descriptor.value = function (req: Request, res: Response) {
      // verify if the req and res are the expected Express's props
      console.log("body" in req, "send" in res);
      if (!req || !req.currentUser) {
        throw new Error("User not authenticated");
      }

      if (req.currentUser.role !== requiredRole) {
        // TODO: Use custom error class
        throw new Error("User does not have the required role");
      }

      // return originalMethod.apply(this, args);  // either way will work, but make the param for descriptor ""...args: any[]"
      return originalMethod.call(this, req, res);
    };

    return descriptor;
  };
}
