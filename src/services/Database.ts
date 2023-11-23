import { GenericPartialType, IMockCrudDatabase } from "../interfaces/ICrudDatabase";

export class MockCrudDatabase<ItemType> implements IMockCrudDatabase<ItemType> {
  private storage: ItemType[] = [];

  async create(item: ItemType): Promise<ItemType> {
    this.storage.push(item);
    return item;
  }

  async getById(id: string | number): Promise<ItemType | undefined> {
    return this.storage.find((item) => (item as any).id == id);
  }

  async update(id: string | number, item: GenericPartialType<ItemType>): Promise<ItemType> {
    const index = this.storage.findIndex((i) => (i as any).id === id);
    if (index !== -1) {
      this.storage[index] = { ...this.storage[index], ...item };
      return this.storage[index];
    }
    throw new Error("MockCrudDB: Item not found!");
  }

  async delete(id: string | number): Promise<boolean> {
    this.storage = this.storage.filter((item) => (item as any).id !== id);
    return true;
  }
}
