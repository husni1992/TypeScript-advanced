import { v4 as uuidv4 } from "uuid";
import { IGenericDatabase } from "../interfaces/IGenericDatabase";
import { RequireAtLeastOne, GenericPartialType } from "../../types";
import { genericDataFilter } from "../../utils/genericDataFilter";

// feature #3 Class is a blueprint for creating objects
export class MockUserDatabase<ItemType> implements IGenericDatabase<ItemType> {
  private storage: ItemType[] = [];

  async create(item: ItemType): Promise<ItemType> {
    const newUser = { id: uuidv4(), ...item };
    this.storage.push(newUser);

    return newUser;
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

    throw new Error("Update failed: Item not found!");
  }

  async updateOne(query: Partial<ItemType>, update: Partial<ItemType>) {
    const foundItem = this.storage.find((item) => this.matchesQuery(item, query));

    if (!foundItem) {
      throw new Error("Item not found: " + JSON.stringify(query));
    }

    Object.entries(update).forEach(([key, value]) => {
      const itemKey = key as keyof ItemType;

      if (!foundItem[itemKey]) {
        throw new Error(`Invalid field '${String(itemKey)}'`);
      }

      if (Array.isArray(foundItem[itemKey])) {
        if (!Array.isArray(value)) {
          throw new Error(`Expected an array for field '${String(itemKey)}'`);
        }

        (foundItem[itemKey] as unknown[]).push(...(value as unknown[]));
        return;
      }
      foundItem[itemKey] = value as NonNullable<ItemType>[keyof ItemType];

      return;
    });
  }

  async delete(id: string | number): Promise<boolean> {
    this.storage = this.storage.filter((item) => (item as any).id !== id);
    return true;
  }

  // the attributes is an object, and must have atleast one field of ItemType
  async findByAttributes(attributes: RequireAtLeastOne<ItemType>): Promise<ItemType[]> {
    const result = genericDataFilter(this.storage, attributes);
    return result;
  }

  private matchesQuery(item: ItemType, query: Partial<ItemType>): boolean {
    return Object.entries(query).every(([key, value]) => item[key as keyof ItemType] === value);
  }
}
