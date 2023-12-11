import { RequireAtLeastOne, GenericPartialType } from "../../types";

// feature #2 Interface is what defines the structure of an object by specifying the properties and methods it should have
// feature #5 Generic interface
// feature #8 Union types, the return types with multiple types is a union type, example: getById
export interface IDataService<T> {
  create(item: T): Promise<T>;
  getById(id: string): Promise<T | undefined>;
  update(id: string, item: GenericPartialType<T>): Promise<T | undefined>;
  delete(id: string): Promise<void>;
  findByAttributes(attributes: RequireAtLeastOne<T>): Promise<T[]>;
}
