// feature #6 Generic interface

import { RequireAtLeastOne, GenericPartialType } from "../../types";

export interface IDataService<T> {
  create(item: T): Promise<T>;
  getById(id: string): Promise<T | undefined>;
  update(id: string, item: GenericPartialType<T>): Promise<T | undefined>;
  delete(id: string): Promise<void>;
  findByAttributes(attributes: RequireAtLeastOne<T>): Promise<T[]>;
}
