/**
 * GenericPartialType: A TypeScript utility type for creating a new type based on an existing type (`Type`),
 * where all properties are optional except for those specified as mandatory (`MandatoryProperties`).
 *
 * This utility showcases several TypeScript features:
 *
 * 1. feature #13 Mapped Types: Iterates over the properties of `Type` and modifies their optionality.
 * 2. feature #6: Generics: Uses generic parameters (`Type` and `MandatoryProperties`) for flexibility and reusability.
 * 4. Utility Types (Feature #17): Employs the built-in `Exclude` utility type to manipulate union types.
 * 5. Union Types (Feature #9): Designed to work with union types as `MandatoryProperties`, allowing a union of keys from `Type`.
 *
 * This utility is useful for creating types that are variations of existing ones, particularly in scenarios where
 * certain properties need to remain mandatory while others become optional.
 */
export type GenericPartialType<Type, MandatoryProperties extends keyof Type = never> = {
  [Property in Exclude<keyof Type, MandatoryProperties>]?: Type[Property];
} & {
  [Property in MandatoryProperties]: Type[Property];
};
