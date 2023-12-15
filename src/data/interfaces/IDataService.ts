import { RequireAtLeastOne, GenericPartialType } from "../../types";

// feature #2 Interface is what defines the structure of an object by specifying the properties and methods it should have
// feature #9 Generics enables reusable code for multiple data types with type safety
// feature #7 Union types allows for a value to be one of several types
export interface IDataService<T> {
  create(item: T): Promise<T>;
  getById(id: string): Promise<T | undefined>;
  update(id: string, item: GenericPartialType<T>): Promise<T | undefined>;
  delete(id: string): Promise<void>;
  findByAttributes(attributes: RequireAtLeastOne<T>): Promise<T[]>;
}
