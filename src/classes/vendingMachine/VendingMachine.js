const Inventory = require("../inventory/Inventory");

class VendingMachine {
  constructor() {
    this.inventory = new Inventory();
    this.vendingRegister = {
      startingBalance: {
        toonieQuantity: 25,
        loonieQuantity: 25,
        quarterQuantity: 60,
        dimeQuantity: 50,
        nickelQuantity: 100
      },
      customerInput: 100
    };
  }

  printInventory() {
    return this.inventory.toString();
  }

  refillAll() {
    return this.inventory.refillAll();
  }

  dispenseSnack(gridInput) {
    if (this.customerInput < this.checkPrice(gridInput)) {
      console.log("Insufficient Funds");
    } else {
      return this.inventory.dispenseSnack(gridInput);
    }
  }

  inputMoney(money) {
    this.customerInput = this.custoerInput + money;
  }

  checkPrice(gridInput) {
    return this.inventory.checkPrice(gridInput);
  }
}

module.exports = VendingMachine;
