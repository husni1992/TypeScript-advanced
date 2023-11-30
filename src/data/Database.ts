import { IGenericDatabase, Query, Update } from "./interfaces/IGenericDatabase";
import { GenericPartialType } from "../types";

export class MockCrudDatabase<ItemType> implements IGenericDatabase<ItemType> {
  private storage: ItemType[] = [];

  async create(item: ItemType): Promise<ItemType> {
    this.storage.push(item);
    return item;
  }

  async getById(id: string | number): Promise<ItemType | undefined> {
    const user = this.storage.find((item) => (item as any).id == id);
    return user && JSON.parse(JSON.stringify(user));
  }

  async update(id: string | number, item: GenericPartialType<ItemType>): Promise<ItemType> {
    const index = this.storage.findIndex((i) => (i as any).id === id);
    if (index !== -1) {
      this.storage[index] = { ...this.storage[index], ...item };
      return this.storage[index];
    }
    throw new Error("MockCrudDB: Item not found!");
  }

  async updateOne(query: Query<ItemType>, update: Update<ItemType>) {
    const foundItem = this.storage.find((item) => this.matchesQuery(item, query));

    if (!foundItem) {
      throw new Error("Item not found: " + JSON.stringify(query));
    }

    if (update.$push) {
      Object.entries(update.$push).forEach(([key, valuesToPush]) => {
        const itemKey = key as keyof ItemType;

        if (!Array.isArray(foundItem[itemKey])) {
          throw new Error(`Field ${key} is not an array.`);
        }

        // Safely handling the array push operation
        (foundItem[itemKey] as unknown[]).push(...(valuesToPush as unknown[]));
      });

      return;
    }

    throw new Error("Update failed" + JSON.stringify(query) + JSON.stringify(update));
  }

  async delete(id: string | number): Promise<boolean> {
    this.storage = this.storage.filter((item) => (item as any).id !== id);
    return true;
  }

  private matchesQuery(item: ItemType, query: Query<ItemType>): boolean {
    return Object.entries(query).every(([key, value]) => item[key as keyof ItemType] === value);
  }
}
