// feature #6.2: Generic service class implementation

import { GenericPartialType, IMockCrudDatabase } from "../../interfaces/ICrudDatabase";
import { DataService } from "./IDataService";

export class GenericDataService<T> implements DataService<T> {
  private repository: IMockCrudDatabase<T>;

  constructor(repository: IMockCrudDatabase<T>) {
    this.repository = repository;
  }

  async create(item: T): Promise<T> {
    try {
      return this.repository.create(item);
    } catch (err) {
      // TODO: Refactor errors
      throw new Error("Failed creating record!");
    }
  }

  async getById(id: string): Promise<T | undefined> {
    // return this.items.find((item) => (item as any).id == id);
    try {
      return this.repository.getById(id);
    } catch (err) {
      throw new Error("Failed getting item by id!");
    }
  }

  async update(id: string, item: GenericPartialType<T>): Promise<T | undefined> {
    try {
      return this.repository.update(id, item);
    } catch (err) {
      throw new Error("Failed update!");
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.repository.delete(id);
      console.log("Successfully deleted!");
    } catch (err) {
      throw new Error("Delete failed!");
    }
  }
}
