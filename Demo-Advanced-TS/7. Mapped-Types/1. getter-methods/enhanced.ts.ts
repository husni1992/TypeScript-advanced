// Map Person type to make getter functions

interface UserProfile {
  username: string;
  email: string;
  lastLogin: Date;
}

// Mock data for demonstration
const userProfileData: UserProfile = {
  username: "JohnDoe",
  email: "johndoe@example.com",
  lastLogin: new Date("2021-01-01"),
};

type GetterMethods<Type> = {
  [Property in keyof Type as `get${Capitalize<Property & string>}`]?: () => Type[Property];
};

const userProfileGetters: GetterMethods<UserProfile> = {
  getUsername: () => userProfileData.username,
  getEmail: () => userProfileData.email,
  getLastLogin: () => userProfileData.lastLogin,
};

export {};
