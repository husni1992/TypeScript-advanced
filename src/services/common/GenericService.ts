// feature #6: Generic service class implementation

import { DataService } from "./IDataService";

export class GenericDataService<T> implements DataService<T> {
  private items: T[] = [];

  create(item: T): T {
    this.items.push(item);
    return item;
  }

  getAll(): T[] {
    return this.items;
  }

  getById(id: string): T | undefined {
    return this.items.find((item) => (item as any).id == id);
  }

  update(id: string, item: T): T | undefined {
    const index = this.items.findIndex((i) => (i as any).id === id);
    if (index !== -1) {
      this.items[index] = item;
      return item;
    }
    return undefined;
  }

  delete(id: string): void {
    this.items = this.items.filter((item) => (item as any).id !== id);
  }
}
