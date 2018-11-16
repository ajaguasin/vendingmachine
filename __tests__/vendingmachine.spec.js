const VendingMachine = require("../src/classes/vendingMachine/VendingMachine");
const Inventory = require("../src/classes/inventory/Inventory");

describe("VendingMachine", () => {
  let VendingMachineTest;
  beforeEach(() => {
    VendingMachineTest = new VendingMachine();
  });
  describe("When vending machine is instantiated", () => {
    it("should have an inventory object", () => {
      expect(VendingMachineTest.inventory).toBeDefined();
    });
  });
});
