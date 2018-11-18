const VendingMachine = require("../src/classes/vendingMachine/VendingMachine");
const Inventory = require("../src/classes/inventory/Inventory");

describe("VendingMachine", () => {
  let VendingMachineTest;
  beforeEach(() => {
    VendingMachineTest = new VendingMachine();
  });
  describe("When vending machine is instantiated", () => {
    it("should have an inventory object", () => {
      expect(VendingMachineTest.inventory).toBeInstanceOf(Inventory);
    });
  });

  describe(".printInventory()", () => {
    it("should print the vending machine inventory", () => {
      expect(VendingMachineTest.printInventory()).toBeDefined();
    });
  });

  describe(".dispenseSnack()", () => {
    it("should 'dispense' a snack object from the vending machine inventory from the given input", () => {
      expect(VendingMachineTest.dispenseSnack("A1")).toMatchObject({
        name: "Cheetos"
      });
    });
  });
});
