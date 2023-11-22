// Generic interface

export interface DataService<T> {
  create(item: T): T;
  getAll(): T[];
  getById(id: string): T | undefined;
  update(id: string, item: T): T | undefined;
  delete(id: string): void;
}
