import { UserTypes } from "../../types/userTypes";

export const mockUser: UserTypes.IUser = {
  id: "99",
  contact: {
    email: "someone@domain.com",
    phoneNumber: "+3168884377",
  },
  hobbies: ["Cycling", "Reading"],
  name: "Husny Ahamed",
  role: UserTypes.Role.Admin,
  status: "ACTIVE",
};
