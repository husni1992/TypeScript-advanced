import { RequireAtLeastOne } from "../types";

/**
 * Filters an array of objects based on a filter object with at least one non-null property match.
 * // feature #20 Advanced Generics enables more complex and flexible reusable code for multiple data types with type safety
 * @template T - The type of objects in the array.
 * @param {T[]} items - The array of objects to filter.
 * @param {RequireAtLeastOne<T>} filter - The filter criteria object.
 * @returns {T[]} - An array of objects that match the filter criteria.
 */
export function genericDataFilter<T>(items: T[], filter: RequireAtLeastOne<T>): T[] {
  return items.filter((item) =>
    Object.keys(filter).every((key) => {
      const itemKey = key as keyof T;
      return item[itemKey] === filter[itemKey];
    }),
  );
}
