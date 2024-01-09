// Map Person type to make getter functions

interface UserProfile {
  username: string;
  email: string;
  lastLogin: Date;
}

type GetterMethod<Type> = {
  [Property in keyof Type as `get${Capitalize<Property & string>}`]?: () => Type[Property];
};

// Mock data for demonstration
const userProfileData: UserProfile = {
  username: "JohnDoe",
  email: "johndoe@example.com",
  lastLogin: new Date("2021-01-01"),
};

export const userProfileGetters: GetterMethod<UserProfile> = {
  getEmail: () => "123,",
  getUsername: () => "",
};
