// feature #6 Generic interface

import { GenericPartialType } from "../../types";

export interface DataService<T> {
  create(item: T): Promise<T>;
  getById(id: string): Promise<T | undefined>;
  update(id: string, item: GenericPartialType<T>): Promise<T | undefined>;
  delete(id: string): Promise<void>;
}
