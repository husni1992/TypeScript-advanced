// This file is intended to be used as a temporary playground just to tryout some TS code and not used in anywhere in the app.

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
