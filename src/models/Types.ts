// feature #4: Enums for UserRole

import { User } from "./User";

export enum UserRole {
  Admin = "ADMIN",
  User = "USER",
  Guest = "GUEST",
}

/**
 * A utility type that creates a new type by making all properties of the original type optional,
 * except for the specified mandatory keys, which are of a specified type.
 *
 * @template Type The original type to be transformed.
 * @template MandatoryKeys The keys of the original type that should remain mandatory.
 * @template MandatoryType The type of the mandatory keys.
 *
 * The resulting type has the following characteristics:
 * - Properties not in MandatoryKeys are optional.
 * - Properties in MandatoryKeys are of type X.
 */
export type GenericPartialTypeForEditWithMandatoryProperty<
  Type,
  MandatoryKeys extends keyof Type = never, // Default to 'never' if no mandatory keys are specified.
  MandatoryType = never // Default to 'never' if no type is specified for the mandatory keys.
> = {
  // Make all properties of Type optional, except those specified in MandatoryKeys.
  [Property in keyof Type as Exclude<Property, MandatoryKeys>]?: Type[Property];
} & {
  // Ensure properties in MandatoryKeys are mandatory and of type X.
  [MK in MandatoryKeys]: MandatoryType;
};

type ModifiedUserType = GenericPartialTypeForEditWithMandatoryProperty<
  User,
  "id" | "hobbies",
  string | number | boolean
>;

const userX: ModifiedUserType = {
  hobbies: 1,
  id: "saas",
};
