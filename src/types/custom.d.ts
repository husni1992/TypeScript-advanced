import { IUser } from "./userTypes";

declare global {
  namespace Express {
    export interface Request {
      currentUser: IUser;
    }
  }
}
