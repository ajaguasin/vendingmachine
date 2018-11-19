import Inventory from "../src/classes/inventory/Inventory";

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

  describe(".checkPrice()", () => {
    it("should return a number representing the price of the Snack", () => {
      expect(InventoryTest.checkPrice("A1")).toBe(250); // cents
    });
  });

  describe(".dispenseSnack()", () => {
    it("should 'dispense' a snack object from the vending machine inventory from the given input and have 1 less element in the array", () => {
      expect(InventoryTest.dispenseSnack("A1")).toMatchObject({
        name: "Cheetos"
      });
      let quantity = InventoryTest.items.find(slot => slot.gridCoord === "A1")
        .slotQuantity.length;
      expect(quantity).toEqual(2);
    });
  });

  describe(".checkQuantity()", () => {
    beforeEach(() => {
      InventoryTest.dispenseSnack("A1");
      InventoryTest.dispenseSnack("A1");
      InventoryTest.dispenseSnack("A1");
    });

    it("should return the length (quantity) of the product with the given input", () => {
      expect(InventoryTest.checkQuantity("A1")).toBe(0);
    });
  });

  describe("When some snacks in the inventory is partially full", () => {
    beforeEach(() => {
      InventoryTest.dispenseSnack("A1");
      InventoryTest.dispenseSnack("A1"); // slotQuantity length is 1
      InventoryTest.dispenseSnack("B1"); // slotQuantity length is 2
      InventoryTest.dispenseSnack("B3"); // slotQuantity length is 2
      InventoryTest.dispenseSnack("C2"); // slotQuanitty length is 0
      InventoryTest.dispenseSnack("C2");
      InventoryTest.dispenseSnack("C2");
    });

    describe(".refillAll()", () => {
      it("should fill the inventory back to full, and return the list of the inventory", () => {
        expect(InventoryTest.refillAll()).toBeDefined();

        let quantityA1 = InventoryTest.items.find(
          slot => slot.gridCoord === "A1"
        ).slotQuantity.length;
        let quantityB1 = InventoryTest.items.find(
          slot => slot.gridCoord === "B1"
        ).slotQuantity.length;
        let quantityB3 = InventoryTest.items.find(
          slot => slot.gridCoord === "B3"
        ).slotQuantity.length;
        let quantityC2 = InventoryTest.items.find(
          slot => slot.gridCoord === "C2"
        ).slotQuantity.length;
        expect(quantityA1).toEqual(3);
        expect(quantityB1).toEqual(3);
        expect(quantityB3).toEqual(3);
        expect(quantityC2).toEqual(3);
      });
    });
  });
});
