import { GenericPartialType } from "../../types";

export type Query<T> = Partial<Record<keyof T, any>>;

export type Update<T> = { $set?: Partial<T>; $push?: Partial<T> };

/**
 * Interface for CRUD operations on a database.
 * This interface decouples the actual database implementation from the consumers of the database.
 * It allows for flexibility in changing the database implementation without affecting the code
 * that uses the database. This is particularly useful for testing and when different implementations
 * are needed in different environments (e.g., development, testing, production).
 */
export interface IGenericDatabase<ItemType> {
  /**
   * Creates a new item in the database.
   * @param item The item to be created.
   * @returns The created item.
   */
  create(item: ItemType): Promise<ItemType>;

  /**
   * Retrieves an item by its ID.
   * @param id The ID of the item to retrieve.
   * @returns The item if found, otherwise undefined.
   */
  getById(id: string | number): Promise<ItemType | undefined>;

  /**
   * Updates an existing item.
   * @param id The ID of the item to update.
   * @param item The updated information.
   * @returns The updated item.
   */
  update(id: string | number, item: GenericPartialType<ItemType>): Promise<ItemType>;

  /**
   * Updates an item based on the specified query and update parameters.
   *
   * @param query - Criteria to identify the item(s) to be updated.
   * @param update - Update operations to apply, with $set and $push options.
   * @returns A Promise that resolves to void after the update operation.
   */
  updateOne(query: Query<ItemType>, update: Update<ItemType>): Promise<void>;

  /**
   * Deletes an item from the database.
   * @param id The ID of the item to delete.
   * @returns A boolean indicating whether the deletion was successful.
   */
  delete(id: string | number): Promise<boolean>;
}
