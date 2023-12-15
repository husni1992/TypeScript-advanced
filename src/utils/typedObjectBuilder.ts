/**
 * TODO: Use this class to create a typed object builder in the app
 * TypedObjectBuilder Class
 *
 * Demonstrates the use of TypeScript's generics and mapped types.
 * This properties of this class are typed with a specific interface or type.
 * Ensures that the properties object contains all the keys and values of the specified type.
 *
 * // feature #15 Mapped Types generate new types by transforming existing ones, iterating over their properties and applying modifications
 * // feature #9 Generics enables reusable code for multiple data types with type safety
 */
export class TypedObjectBuilder<Properties> {
  /**
   * Constructor
   *
   * @param properties - An object that must match the structure of the Properties type.
   *
   * The use of a mapped type in the constructor argument ensures that
   * the provided properties object has keys and values that match
   * the structure of the Properties generic type.
   */
  constructor(public readonly properties: { [K in keyof Properties]: Properties[K] }) {}
}

// Example Usage

// Define a Person type
type Person = {
  name: string;
  age: number;
};

// Create an instance of TypedObjectBuilder with the Person type
const person1 = new TypedObjectBuilder<Person>({
  name: "John",
  age: 30, // Strictly typed as per the Person interface
});

// Accessing the properties
console.log(person1.properties.name); // Output: John
console.log(person1.properties.age); // Output: 30
