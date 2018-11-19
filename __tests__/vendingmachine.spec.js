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
    beforeEach(() => {
      VendingMachineTest.inputMoney("toonie");
      VendingMachineTest.inputMoney("quarter");
      VendingMachineTest.inputMoney("quarter");
    });
    it("should 'dispense' a snack object from the vending machine inventory from the given input", () => {
      expect(VendingMachineTest.dispenseSnack("A1")).toMatchObject({
        name: "Cheetos"
      });
    });
  });

  describe("When the vending machine register has currentInput, and customer wants to get back their money", () => {
    beforeEach(() => {
      VendingMachineTest.inputMoney("toonie");
      VendingMachineTest.inputMoney("toonie");
      VendingMachineTest.inputMoney("loonie");
      VendingMachineTest.inputMoney("quarter");
      VendingMachineTest.inputMoney("dime");
      VendingMachineTest.inputMoney("nickel"); // 540 total
      VendingMachineTest.dispenseSnack("A1"); // - 250
      //change due: 290
    });

    it("should return the value of the currentInput", () => {
      expect(VendingMachineTest.getChange()).toEqual(290);
    });
  });

  describe(".inputMoney()", () => {
    it("should return the value of the accumulated money the vending machine has received", () => {
      expect(VendingMachineTest.inputMoney("toonie")).toEqual(200); // cents
      expect(VendingMachineTest.inputMoney("toonie")).toEqual(400);
      expect(VendingMachineTest.inputMoney("loonie")).toEqual(500);
    });
  });
});
