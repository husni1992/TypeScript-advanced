import { MockUserDatabase } from "./MockUserDatabase";

describe("MockUserDatabase", () => {
  let db: MockUserDatabase<any>;

  beforeEach(() => {
    db = new MockUserDatabase();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("create method", () => {
    it("should add an item to the database", async () => {
      const item = { id: "1", name: "John Doe" };
      await db.create(item);
      const storedItem = await db.getById("1");
      expect(storedItem).toEqual(item);
    });
  });

  describe("getById method", () => {
    it("should return an item by its ID", async () => {
      const item = { id: "1", name: "John Doe" };
      await db.create(item);
      const retrievedItem = await db.getById("1");
      expect(retrievedItem).toEqual(item);
    });

    it("should return undefined if the item does not exist", async () => {
      const retrievedItem = await db.getById("2");
      expect(retrievedItem).toBeUndefined();
    });
  });

  describe("update method", () => {
    it("should update an existing item", async () => {
      const item = { id: "1", name: "John Doe" };
      await db.create(item);
      await db.update("1", { name: "Jane Doe" });
      const updatedItem = await db.getById("1");
      expect(updatedItem).toEqual({ id: "1", name: "Jane Doe" });
    });

    it("should throw an error if the item does not exist", async () => {
      await expect(async () => {
        await db.update("2", { name: "Jane Doe" });
      }).rejects.toThrow("Update failed: Item not found!");
    });
  });

  describe("updateOne method", () => {
    it("should update name", async () => {
      const item1 = { id: "1", name: "John Doe" };
      const item2 = { id: "2", name: "Jane Doe" };
      await db.create(item1);
      await db.create(item2);
      await db.updateOne({ id: "1" }, { name: "Updated John Doe" });
      const updatedItem = await db.getById("1");
      expect(updatedItem).toEqual({ id: "1", name: "Updated John Doe" });
    });

    it("should update array of hobbies", async () => {
      const item1 = { id: "1", hobbies: ["a", "b"] };
      await db.create(item1);
      await db.updateOne({ id: "1" }, { hobbies: ["c", "d"] });
      const updatedItem = await db.getById("1");
      expect(updatedItem).toEqual({ id: "1", hobbies: ["a", "b", "c", "d"] });
    });

    it("should throw an error if no items match the filter", async () => {
      await expect(db.updateOne({ id: "3" }, { name: "Jane Doe" })).rejects.toThrow(
        "Item not found",
      );
    });

    it("should throw an error non existing field is provided", async () => {
      const item1 = { id: "1", name: "John Doe", hobbies: ["Cycling", "Reading"] };
      await db.create(item1);

      await expect(async () => {
        await db.updateOne({ id: "1" }, { hobby: ["Writing"] });
      }).rejects.toThrow("Invalid field 'hobby'");
    });

    it("should throw if field is an existing array and the given value is not an array", async () => {
      const item1 = { id: "1", hobbies: ["a", "b"] };
      await db.create(item1);

      await expect(async () => {
        await db.updateOne({ id: "1" }, { hobbies: "invalid" });
      }).rejects.toThrow("Expected an array for field 'hobbies'");
    });

    // it("should throw if nothing to update", async()=>{
    //   const item1 = { id: "1", name: "John Doe" };
    //   await db.create(item1);

    //   await db.updateOne({ id: "1" }, { name: item1.name });
    //   const updatedItem = await db.getById("1");
    //   expect(updatedItem).toEqual({ id: "1", name: "Updated John Doe" });
    // })
  });

  describe("delete method", () => {
    it("should delete an item by its ID", async () => {
      const item = { id: "1", name: "John Doe" };
      await db.create(item);
      await db.delete("1");
      const retrievedItem = await db.getById("1");
      expect(retrievedItem).toBeUndefined();
    });

    it("should not throw an error if the item does not exist", async () => {
      await expect(async () => {
        await db.delete("2");
      }).not.toThrow();
    });
  });

  describe("findByAttributes method", () => {
    it("should find items matching given attributes", async () => {
      const item1 = { id: "1", name: "John Doe", active: true };
      const item2 = { id: "2", name: "Jane Doe", active: false };
      await db.create(item1);
      await db.create(item2);
      const activeUsers = await db.findByAttributes({ active: true });
      expect(activeUsers).toEqual([item1]);
    });

    it("should return an empty array if no items match the attributes", async () => {
      const item1 = { id: "1", name: "John Doe", active: true };
      const item2 = { id: "2", name: "Jane Doe", active: false };
      await db.create(item1);
      await db.create(item2);
      const inactiveUsers = await db.findByAttributes({ active: false, name: "John Doe" });
      expect(inactiveUsers).toEqual([]);
    });
  });
});
