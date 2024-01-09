import { UserTypes } from "./userTypes";

/**
 * GenericPartialType: A TypeScript utility type for creating a new type based on an existing type (`Type`),
 * where all properties are optional except for those specified as mandatory (`MandatoryProperties`).
 *
 * This utility showcases several TypeScript features:
 *
 * 1. feature #9 Generics enables reusable code for multiple data types with type safety
 * 2. feature #8 Intersection Types combines types into one by merging their properties and creating a new type.
 * 3. feature #6 Nullable types
 * 4. feature #15 Mapped Types generate new types by transforming existing ones, iterating over their properties and applying modifications
 * 5. feature #13 'Exclude' utility type to manipulate union types.
 *
 * This utility is useful for creating types that are variations of existing ones, particularly in scenarios where
 * certain properties need to remain mandatory while others become optional.
 */
export type GenericPartialType<Type, MandatoryProperties extends keyof Type = never> = {
  [Property in Exclude<keyof Type, MandatoryProperties>]?: Type[Property];
} & {
  [Property in MandatoryProperties]: Type[Property];
};

// example usage: In below implementation, all the fields are made optional except "id"
let updateUser: GenericPartialType<UserTypes.IUser, "id"> = {
  id: "someid",
};

// This generic type is a variant of built-in Partial,
// but with at-least one property mandatory
// feature #13 Custom utility type
// feature #15 Mapped Types generate new types by transforming existing ones, iterating over their properties and applying modifications
// feature #20 Advanced Generics enables more complex and flexible reusable code for multiple data types with type safety
export type RequireAtLeastOne<
  T,
  RequiredKeys extends keyof T = keyof T,
> = RequiredKeys extends keyof T ? Partial<T> & Required<Pick<T, RequiredKeys>> : never;

// This ensures at-least one property of UserTypes.IUser is assigned.
let example1: RequireAtLeastOne<UserTypes.IUser, "id"> = {
  id: "1212",
};

// Makes all properties optional except id
let example2: RequireAtLeastOne<UserTypes.IUser> = {
  name: "asa",
};
