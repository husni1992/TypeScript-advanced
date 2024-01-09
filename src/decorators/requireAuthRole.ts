import { Request, Response } from "express";
import { UserTypes } from "../types/userTypes";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { UnauthenticatedError } from "../errors/Unauthenticated";

export function RequireAuthRole(requiredRole: UserTypes.Role) {
  return function actualDecorator(originalMethod: any, context: ClassMethodDecoratorContext) {
    const methodName = String(context.name);

    function replacementMethod(this: any, req: Request, res: Response) {
      if (req.currentUser.isAuthenticated !== "true") {
        throw new UnauthenticatedError();
      }

      if (req.currentUser.userRole !== requiredRole) {
        throw new UnauthorizedError(
          `User attempted to perform action ${methodName} with role ${req.currentUser.role} `,
        );
      }

      return originalMethod.call(this, req, res);
    }

    return replacementMethod;
  };
}

// feature #17 Decorators are functions that modify class, method, property, or parameter behavior and metadata at compile or runtime.
// Old way before TS version 4.9 and below, works with "experimentalDecorators": true in tsconfig
export function _RequireAuthRoleOld(requiredRole: UserTypes.Role) {
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

      return originalMethod.call(this, req, res);
    };

    return descriptor;
  };
}
