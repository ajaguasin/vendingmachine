const Inventory = require("../src/classes/inventory/Inventory");

describe("Inventory", () => {
  let InventoryTest;
  beforeEach(() => {
    InventoryTest = new Inventory();
  });

  describe("When Inventory is instantiated", () => {
    it("should have an items property that holds an array of slots objects with Snack objects", () => {
      expect(InventoryTest.items).toBeDefined();
      //   console.log(JSON.stringify(InventoryTest.items, 0, 2)); // Show Items on console
    });
  });

  describe(".createItems()", () => {
    it("should return an array of slot objects with Snack objects", () => {
      expect(InventoryTest.createItems()).toBeDefined();
    });
  });

  describe(".dispenseSnack()", () => {
    it("should 'dispense' a snack object from the vending machine inventory from the given input", () => {
      expect(InventoryTest.dispenseSnack("A1")).toMatchObject({
        name: "Cheetos"
      });
    });
  });

  describe("When some snacks in the inventory is partially full", () => {
    beforeEach(() => {
      InventoryTest.dispenseSnack("A1");
      InventoryTest.dispenseSnack("A1");
      InventoryTest.dispenseSnack("B1");
      InventoryTest.dispenseSnack("B3");
      InventoryTest.dispenseSnack("C2");
      InventoryTest.dispenseSnack("C2");
      InventoryTest.dispenseSnack("C2");
      console.log(InventoryTest.toString());
    });

    describe(".refillAll()", () => {
      it("should fill the inventory back to full, and return the list of the inventory", () => {
        expect(InventoryTest.refillAll()).toBeDefined();
        console.log(InventoryTest.toString());
      });
    });
  });
});
