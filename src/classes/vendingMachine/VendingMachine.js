const Inventory = require("../inventory/Inventory");

class VendingMachine {
  constructor() {
    this.inventory = new Inventory();
  }

  printInventory() {
    return this.inventory.toString();
  }

  refillAll() {
    return this.inventory.refillAll();
  }

  dispenseSnack(gridInput) {
    return this.inventory.dispenseSnack(gridInput);
  }
}

module.exports = VendingMachine;
