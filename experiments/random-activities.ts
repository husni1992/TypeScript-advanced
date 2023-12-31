// This file is intended to be used as a temporary playground just to tryout some TS code and not used in anywhere in the app
import { UserTypes } from "../src/types/userTypes";

type Car = {
  make?: string;
  model: string;
  mileage?: number;
};

// Utility types

// feature #13 Utility Types "Required": makes every field required
let myCar1: Required<Car> = {
  make: "BMW",
  mileage: 322333,
  model: "E46",
};

// feature #13 Utility Types "Uppercase": makes string type mandatory to be Uppercase
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
// feature #9 Generics enables reusable code for multiple data types with type safety
  In below example. the T extends UserTypes.IUser["role"] means that the generic type T can be any type 
  that is compatible with the type of the role property in the UserTypes.IUser interface. 
  It's like saying, "T can be any type, as long as it's the same type as UserTypes.IUser["role"] or a subtype of it."
*/
function zee<T extends UserTypes.Role>(obj: { role: T }): UserTypes.UserInfoBasedOnRole<T> {
  if (obj.role === UserTypes.Role.Admin) {
    return {
      phoneNumber: "",
      email: "",
    } as UserTypes.UserInfoBasedOnRole<T>;
  }

  if (obj.role === UserTypes.Role.User) {
    return {
      email: "",
    } as UserTypes.UserInfoBasedOnRole<T>;
  }

  if (obj.role === UserTypes.Role.Guest) {
    return {
      status: "foo" as UserTypes.IUser["status"],
      hobbies: ["foo"],
    } as UserTypes.UserInfoBasedOnRole<T>;
  }

  throw new Error("Invalid role");
}

// Typescript infers adminInfo type as PrivateInfo
let adminInfo = zee({ role: UserTypes.Role.Admin }); // Should be inferred as UserTypes.UserInfoBasedOnRole<UserTypes.UserRole.Admin>

let userInfo = zee({ role: UserTypes.Role.User }); // Should be inferred as UserTypes.UserInfoBasedOnRole<UserTypes.UserRole.User>

let guestInfo = zee({ role: UserTypes.Role.Guest }); // Should be inferred as UserTypes.UserInfoBasedOnRole<UserTypes.UserRole.Guest>

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

// ******* Play with Partials *********

// Atleast one mandatory Partial

type AtLeastOne<T, Keys extends keyof T = keyof T> = Keys extends keyof T
  ? Omit<Partial<T>, Keys> & Required<Pick<T, Keys>>
  : never;

// Example usage
type UserX = {
  name: string;
  age: number;
  email: string;
};

// Type where at least one of the User properties is required
type UserWithAtLeastOneField = AtLeastOne<UserX>;

let u: UserWithAtLeastOneField = {
  email: "asas",
};

type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Keys extends keyof T
  ? Omit<Partial<T>, Keys> & Required<Pick<T, Keys>>
  : never;

type RequireAtLeastOneV2<T, Keys extends keyof T> = Omit<Partial<T>, Keys> &
  Required<Pick<T, Keys>>;

type RequireOneV3 = Omit<
  Partial<UserTypes.IUser>,
  "id" | "name" | "role" | "contact" | "hobbies" | "status"
> &
  Required<Pick<UserTypes.IUser, "id" | "name" | "role" | "contact" | "hobbies" | "status">>;

type RequireAtLeastOneV4 =
  | Required<Pick<UserTypes.IUser, "id">>
  | Required<Pick<UserTypes.IUser, "name">>
  | Required<Pick<UserTypes.IUser, "role">>
  | Required<Pick<UserTypes.IUser, "contact">>
  | Required<Pick<UserTypes.IUser, "hobbies">>
  | Required<Pick<UserTypes.IUser, "status">>;

type RequireAtLeastOneV5<T, Keys extends keyof T = keyof T> = Keys extends keyof T
  ? Required<Pick<T, Keys>>
  : never;

let __r: RequireAtLeastOne<UserTypes.IUser, "name" | "id"> = {
  id: "someid",
};

type SelectivePartial<T, keys extends keyof T> = Pick<Partial<T>, keys>;

let mp: SelectivePartial<UserTypes.IUser, "id" | "name"> = {
  id: "sas",
  name: "sad",
};

// ******* End of Play with Partials *********

// Hybrid Type: Function can be defined with a type or an interface both
type GreetingFunctionType = (name: string) => string;
interface GreetingFunctionInterface {
  (name: string): string;
}
const greet1: GreetingFunctionType = (name) => `Hello, ${name}!`;
const greet2: GreetingFunctionInterface = (name) => `Hello, ${name}!`;

// removed 'readonly' attributes from a type
type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property];
};

type LockedAccount = {
  readonly id: string;
  readonly name: string;
};

type UnlockedAccount = CreateMutable<LockedAccount>;
let v: UnlockedAccount = {
  id: "1",
  name: "foo",
};

v.id = "2";

// Mapped type example

type Fruit = "Apple" | "Banana" | "Orange";

type FruitName<T extends Fruit> = `Fruit: ${T}`;

const fruit1: FruitName<"Apple"> = "Fruit: Apple";
const fruit2: FruitName<"Banana"> = "Fruit: Banana";
const fruit3: FruitName<"Orange"> = "Fruit: Orange";

// Template literals
// ex1
type World = "world";
type Greeting = `hello ${World}`;

let rrrr: Greeting = "hello world";

// ex2
type EmailLocaleIDs = "welcome_email" | "email_heading";
type FooterLocaleIDs = "footer_title" | "footer_sendoff";

type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
let _R: AllLocaleIDs = "footer_title_id";

// ex3
type Lang = "en" | "ja" | "pt";

type LocaleMessageIDs = `${Lang}_${AllLocaleIDs}`;
let _t: LocaleMessageIDs = "pt_email_heading_id";

// ex3 Complex use case

type BaseObjectType = { firstName: string; lastName: string; age: number };

type PropEventSource<Type> = {
  on(
    eventName: `${string & keyof Type}Changed`,
    callback: <R extends string>(newValue: R) => void,
  ): void;
};

const passedObject: BaseObjectType = {
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26,
};

function removeChangedFromEnd(input) {
  // Check if the input ends with "Changed"
  if (input.endsWith("Changed")) {
    // Remove the last 7 characters (i.e., "Changed")
    return input.substring(0, input.length - 7);
  }
  // Return the input unchanged if it doesn't end with "Changed"
  return input;
}

function makeWatchedObject<Type>(baseObject: Type): Type & PropEventSource<Type> {
  return {
    ...baseObject,
    on: function (eventName: string, callback: Function) {
      const keyOfChangedProp = removeChangedFromEnd(eventName);

      callback(baseObject[keyOfChangedProp]);
    },
  };
}

const person = makeWatchedObject<BaseObjectType>(passedObject);
person.on("firstNameChanged", function (p: string) {
  console.log("callback run", p);
});

// interfaces
// ex1 Index Signatures
interface StringMap {
  [key: string]: "string" | "BOOL";
}

const map: StringMap = { greeting: "BOOL", farewell: "string" };

// ex2 Function Types
interface BinaryOperationByInterface {
  (operand1: number, operand2: number): number;
}

type BinaryOperationByType = (operand1: number, operand2: number) => number;

// the both of above gives same output
const add1: BinaryOperationByInterface = (x, y) => x + y;
const add2: BinaryOperationByType = (x, y) => x + y;

// 20/12/2023
// Literal Types
const num: 43 = 43;
const far: 1 | 2 | 3 = 3;

// Template Literal Types
type TemplateLiteralType<T extends string> = `Hello, ${T}!`;
const g: TemplateLiteralType<"Husny"> = "Hello, Husny!";

// 4/1/2024
const user = { name: "Husa", country: "SriLanka" } satisfies UserTypes.IUser;

// 05/01/2024
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

interface UserXYZ {
  name: string;
  contact: {
    phone: string;
    email: string;
    address: {
      address1: string;
      houseNo: number;
    };
  };
}

const foo_11: DeepReadonly<UserXYZ> = {
  name: "Husa",
  contact: {
    email: "mgha123@gmail.com",
    phone: "+312222222",
    address: {
      address1: "1212",
      houseNo: 34,
    },
  },
};

foo_11.name = "Ahamed";
