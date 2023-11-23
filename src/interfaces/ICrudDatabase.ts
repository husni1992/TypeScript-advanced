/**
 * Interface for CRUD operations on a database.
 * This interface decouples the actual database implementation from the consumers of the database.
 * It allows for flexibility in changing the database implementation without affecting the code
 * that uses the database. This is particularly useful for testing and when different implementations
 * are needed in different environments (e.g., development, testing, production).
 */
export interface IMockCrudDatabase<ItemType> {
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
  update(id: string | number, item: PartialType<ItemType>): Promise<ItemType>;

  /**
   * Deletes an item from the database.
   * @param id The ID of the item to delete.
   * @returns A boolean indicating whether the deletion was successful.
   */
  delete(id: string | number): Promise<boolean>;
}

type PartialType<Type> = {
  [Property in keyof Type]?: Type[Property];
};
