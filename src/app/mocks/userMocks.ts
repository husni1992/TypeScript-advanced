import { IUser, UserRole } from "../../types/userTypes";

export const mockUser: IUser = {
  id: "99",
  contact: {
    email: "someone@domain.com",
    phoneNumber: "+3168884377",
  },
  hobbies: ["Cycling", "Reading"],
  name: "Husny Ahamed",
  role: UserRole.Admin,
  status: "ACTIVE",
};
