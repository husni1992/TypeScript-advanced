import { UserTypes } from "./userTypes";

declare global {
  namespace Express {
    export interface Request {
      currentUser: UserTypes.IUser;
    }
  }
}
