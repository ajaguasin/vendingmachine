const Inventory = require("../src/classes/inventory/Inventory");

describe("Inventory", () => {
  let InventoryTest;
  beforeEach(() => {
    InventoryTest = new Inventory();
  });
  describe("When Inventory is instantiated", () => {
    it("should have an 2D array of Snack objects", () => {
      expect(InventoryTest).toBeDefined();
    });
  });
});
