import { Request, Response } from "express";
import { UserTypes } from "../types/userTypes";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { UnauthenticatedError } from "../errors/Unauthenticated";

// feature #17 Decorators are functions that modify class, method, property, or parameter behavior and metadata at compile or runtime.
export function RequireRole(requiredRole: UserTypes.Role) {
  return function (
    target: Object,
    methodName: string,
    descriptor: PropertyDescriptor,
  ): PropertyDescriptor | void {
    const originalMethod = descriptor.value;

    descriptor.value = function (req: Request, res: Response) {
      if (req.currentUser.isAuthenticated !== "true") {
        throw new UnauthenticatedError();
      }

      if (req.currentUser.userRole !== requiredRole) {
        throw new UnauthorizedError(
          `User attempted to perform action ${methodName} with role ${req.currentUser.role} `,
        );
      }

      // return originalMethod.apply(this, args);  // either way will work, but make the param for descriptor ""...args: any[]"
      return originalMethod.call(this, req, res);
    };

    return descriptor;
  };
}
