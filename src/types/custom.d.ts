import { UserTypes } from "./userTypes";

/**
 * feature #14 Namespaces help in organizing code into named groups, making it easier to manage and use in larger applications
 * feature #19 Module Augmentation allows you to add new declarations to existing modules without modifying the original module
 * Augmenting Express Request to include 'currentUser'.
 * This property stores the authenticated user's information,
 * set in the authentication middleware and accessible in route handlers.
 */

declare global {
  namespace Express {
    export interface Request {
      currentUser: UserTypes.IUser;
    }
  }
}
