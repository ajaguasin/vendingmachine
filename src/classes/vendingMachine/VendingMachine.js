const Inventory = require("../inventory/Inventory");

class VendingMachine {
  constructor() {
    this.inventory = new Inventory();
  }
}

module.exports = VendingMachine;
