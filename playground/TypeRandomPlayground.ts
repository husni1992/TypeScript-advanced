// This file is intended to be used as a temporary playground just to tryout some TS code and not used in anywhere in the app.

import { UserInfoBasedOnRole, UserRole, UserStatus } from "../src/types/userTypes";

type Car = {
  make?: string;
  model: string;
  mileage?: number;
};

// Utility types

// feature #17: Utility Type "Required": makes every field required
let myCar1: Required<Car> = {
  make: "BMW",
  mileage: 322333,
  model: "E46",
};

// feature #17: Utility Type "Uppercase": makes string type mandatory to be Uppercase
type A = "one" | "two";
type B = Uppercase<A>;

// let foo: B = "one"; // this is incorrect
let bar: B = "ONE"; // Type '"one"' is not assignable to type '"ONE" | "TWO"'.

// conditional types
type WrappedValue<T> = T extends infer U ? { value: U } : never;

function wrap<T>(value: T): { value: T } {
  return { value };
}

let a = wrap(1);

// any vs unknown
function exampleWithAny(value: any) {
  // No type checking, we can perform any operation
  console.log(value.length); // No error, even if 'value' might not have 'length'
  return value * 10; // No error, even if 'value' might not be a number
}

function exampleWithUnknown(value: unknown) {
  // No type checking, we can perform any operation
  if (Array.isArray(value)) {
    console.log(value.length); // No error, even if 'value' might not have 'length'
  }

  if (typeof value === "number") {
    console.log(value * 10); // No error, even if 'value' might not be a number
  }
}

exampleWithAny("hello"); // Works, but risky if we expect only numbers
exampleWithAny(5); // Works, but no type safety

// end of any vs unknown

/*
// feature #6 Generic Type Constraint
  In below example. the T extends IUser["role"] means that the generic type T can be any type 
  that is compatible with the type of the role property in the IUser interface. 
  It's like saying, "T can be any type, as long as it's the same type as IUser["role"] or a subtype of it."
*/
function zee<T extends UserRole>(obj: { role: T }): UserInfoBasedOnRole<T> {
  if (obj.role === UserRole.Admin) {
    return {
      phoneNumber: "",
      email: "",
    } as UserInfoBasedOnRole<T>;
  }

  if (obj.role === UserRole.User) {
    return {
      email: "",
    } as UserInfoBasedOnRole<T>;
  }

  if (obj.role === UserRole.Guest) {
    return {
      status: "foo" as UserStatus,
      hobbies: ["foo"],
    } as UserInfoBasedOnRole<T>;
  }

  throw new Error("Invalid role");
}

// Typescript infers adminInfo type as PrivateInfo
let adminInfo = zee({ role: UserRole.Admin }); // Should be inferred as UserInfoBasedOnRole<UserRole.Admin>

let userInfo = zee({ role: UserRole.User }); // Should be inferred as UserInfoBasedOnRole<UserRole.User>

let guestInfo = zee({ role: UserRole.Guest }); // Should be inferred as UserInfoBasedOnRole<UserRole.Guest>

// 04/12/2023

// TS utility type readonly
type User = {
  readonly _id: string;
  name: string;
};

let foo: User = {
  _id: "asas",
  name: "husnyh",
};

foo.name = "asa";
foo._id = "1212"; // cannot edit this

//

function alwaysThrows(errorMessage: string): never {
  throw new Error(errorMessage);
}

function throwError(errorMessage: string): never {
  alwaysThrows("foo");
}

function foo2(errorMessage: string): never {
  let a = 0;
  while (true) {
    console.log(errorMessage);
  }
}

function foo3(errorMessage: string): never {
  console.log("This should not be logged");
  // Forcefully telling TypeScript this line is never reached
  return undefined as never;
}

// Record utility type

// example 1 using Record
interface CatInfo {
  age: number;
  breed: string;
}

type CatName = "miffy" | "boris" | "mordred";

const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: "Persian" },
  boris: { age: 5, breed: "Maine Coon" },
  mordred: { age: 16, breed: "British Shorthair" },
  // mufa: { age: 2, breed: "Persian" },
};

cats.boris;

// same example without using Record

type CatName2 = "miffy" | "boris" | "mordred";

type CatInfo2 = { age: number; breed: string };

type CATMAP<T extends CatName2> = {
  [property in T]: CatInfo2;
};

const cats2: CATMAP<CatName2> = {
  miffy: { age: 10, breed: "Persian" },
  boris: { age: 5, breed: "Maine Coon" },
  mordred: { age: 16, breed: "British Shorthair" },
  // mufa: { age: 2, breed: "Persian" },
};

cats2.miffy;

let asasa: Record<"mambuSecrets", any> = {
  mambuSecrets: { as: 1212 },
};

// exercise 1,

type Discriminator = 1 | 2 | 3 | 4;

function factory(d: Discriminator) {
  const map: Record<Discriminator, () => string> = {
    1: () => "1",
    2: () => "2",
    3: () => "3",
    4: () => "4",
  };

  return map;
}

let t = factory(1);

// Utility Type: Parameters<Type>
function greet(name: string, age: number, foo: CatName2) {
  console.log(`Hello, ${name}, you are ${age} years old!`);
}

type GreetParams = Parameters<typeof greet>;

const greetParams: GreetParams = ["John", 30, "miffy"];

// Utility Type: NonNullable<Type>
type NullableString = string | null;
type NonNullableString = NonNullable<NullableString>;

const nonNullableString: NonNullableString = "Hello";

// Utility Type: ReturnType<Type>
type GreetReturn = ReturnType<typeof greet>;

const greetReturn: GreetReturn = undefined; // ReturnType is void

// Generic class using Record utility

type FOOO<Type> = {
  [Property in keyof Type]: Type[Property];
};

class Result<Properties> {
  constructor(public readonly properties: { [K in keyof Properties]: Properties[K] }) {}
}

type Person = {
  name: string;
  age: number;
};

const p1 = new Result<Person>({ age: 31, name: "husnyh" });
