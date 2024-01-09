interface IUser {
  readonly id: number;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
}

type RequireAtLeastOne<T, MandatoryKey extends keyof T = keyof T> = MandatoryKey extends keyof T
  ? Partial<T> & Required<Pick<T, MandatoryKey>>
  : never;

const userData: RequireAtLeastOne<IUser> = {
  name:
};

export { userData };

// example
// src/data/repositories/MockUserDatabase.ts:65
