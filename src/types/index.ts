import { UserTypes } from "./userTypes";

/**
 * GenericPartialType: A TypeScript utility type for creating a new type based on an existing type (`Type`),
 * where all properties are optional except for those specified as mandatory (`MandatoryProperties`).
 *
 * This utility showcases several TypeScript features:
 *
 * 1. feature #5 Generics: Uses generic parameters ('Type' and 'MandatoryProperties') for flexibility and reusability.
 * 2. feature #8 Union Types: Designed to work with union types as 'MandatoryProperties', allowing a union of keys from 'Type'.
 * 3. feature #9 Intersection Types, & operator combines the two sets of properties using an intersection type.
 * 4. feature #11 Nullable types
 * 5. feature #13 Mapped Types: Iterates over the properties of 'Type' and modifies their optionality.
 * 6. feature #17 'Exclude' utility type to manipulate union types.
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

// TODO: add documentation and examples, this type is a variant of built-in Partial,
// but with at-least one property mandatory
// feature #9 Intersection Types
// feature #13 Mapped Types: uses a mapped type to make certain properties optional.
// feature #21 Advanced Generics: more complex and flexible type definitions
export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Keys extends keyof T
  ? Omit<Partial<T>, Keys> & Required<Pick<T, Keys>>
  : never;


// This ensures at-least one property of UserTypes.IUser is assigned.
let example1: RequireAtLeastOne<UserTypes.IUser> = {
  name: "foo"
};

// Makes all properties optional except id
let example2: RequireAtLeastOne<UserTypes.IUser, "id"> = {
  id: "011"
};