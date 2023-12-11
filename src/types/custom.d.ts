import { UserTypes } from "./userTypes";

/**
 * feature #19 Module Augmentation
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
