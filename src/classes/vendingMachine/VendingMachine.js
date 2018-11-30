import Inventory from "../inventory/Inventory";
const MONEY_VALUES = {
  toonie: 200,
  loonie: 100,
  quarter: 25,
  dime: 10,
  nickel: 5
};
class VendingMachine {
  constructor() {
    this.inventory = new Inventory();
    this.vendingRegister = {
      startingBalance: {
        toonie: 2500,
        loonie: 2500,
        quarter: 6000,
        dime: 5000,
        nickel: 10000
      },
      customerInput: {
        toonie: 0,
        loonie: 0,
        quarter: 0,
        dime: 0,
        nickel: 0
      },
      changeresults: "",
      customerTotal: 0,
      changeDue: 0,
      gridInput: "",
      message: ""
    };
  }

  setGridInput(gridInput) {
    this.gridInput = gridInput;
  }

  printInventory() {
    return this.inventory.toString();
  }

  refillAll() {
    return this.inventory.refillAll();
  }

  dispenseSnack(gridInput) {
    if (this.countCustomerTotal() < this.checkPrice(gridInput)) {
      this.message = "Insufficient Funds";
    } else if (this.inventory.checkQuantity(gridInput) < 0) {
      this.message = "Out of stock";
    } else {
      this.vendingRegister.changeDue =
        this.countCustomerTotal() - this.checkPrice(gridInput);

      return this.inventory.dispenseSnack(gridInput);
    }
  }

  inputMoney(money) {
    switch (money) {
      case "toonie":
        this.vendingRegister.customerInput["toonie"]++;
        break;
      case "loonie":
        this.vendingRegister.customerInput["loonie"]++;
        break;
      case "quarter":
        this.vendingRegister.customerInput["quarter"]++;
        break;
      case "dime":
        this.vendingRegister.customerInput["dime"]++;
        break;
      case "nickel":
        this.vendingRegister.customerInput["nickel"]++;
        break;
      default:
        break;
    }

    return this.countCustomerTotal();
  }

  countCustomerTotal() {
    let customerInput = this.vendingRegister.customerInput;
    let result = 0;
    for (const coin in customerInput) {
      if (customerInput.hasOwnProperty(coin)) {
        result += customerInput[coin] * MONEY_VALUES[coin];
      }
    }
    this.vendingRegister.customerTotal = result;
    return result;
  }

  checkPrice(gridInput) {
    return this.inventory.checkPrice(gridInput);
  }

  resupplyChange() {
    let startingBalance = this.vendingRegister.startingBalance;
    for (const coin in startingBalance) {
      if (startingBalance.hasOwnProperty(coin)) {
        if (startingBalance[coin] < 1000) {
          startingBalance[coin] += 1000;
        }
      }
    }
    return JSON.stringify(startingBalance, 0, 2);
  }

  getChange() {
    // add customer's input to the vending machine's change balance
    let startingBalance = this.vendingRegister.startingBalance;
    let customerInput = this.vendingRegister.customerInput;
    for (const coin in customerInput) {
      if (customerInput.hasOwnProperty(coin)) {
        startingBalance[coin] += customerInput[coin] * MONEY_VALUES[coin];
        customerInput[coin] = 0;
      }
    }

    // return customer change
    for (const coin in MONEY_VALUES) {
      if (MONEY_VALUES.hasOwnProperty(coin)) {
        while (
          Math.floor(this.vendingRegister.changeDue / MONEY_VALUES[coin]) >= 1
        ) {
          customerInput[coin] += Math.floor(
            this.vendingRegister.changeDue / MONEY_VALUES[coin]
          );
          this.vendingRegister.changeDue -=
            Math.floor(this.vendingRegister.changeDue / MONEY_VALUES[coin]) *
            MONEY_VALUES[coin];
          startingBalance[coin] -= customerInput[coin] * MONEY_VALUES[coin];
        }
      }
    }
    let obj = {
      changeBack: 0,
      coinQuantity: this.customerInput
    };
    let result = this.countCustomerTotal();
    this.vendingRegister.customerTotal = 0;
    for (const coin in customerInput) {
      if (customerInput.hasOwnProperty(coin)) {
        customerInput[coin] = 0;
      }
    }

    obj.coinQuantity = result;
    this.changeresults = obj;
    return result;
  }
}

export default VendingMachine;
