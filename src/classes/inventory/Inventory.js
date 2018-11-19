const Snack = require("../snack/Snack");

class Inventory {
  constructor() {
    this.inventorySlotLimit = 3;
    this.inventoryGridLimit = 9;
    this.snackChoices = [
      { name: "Cheetos", price: 250, gridCoord: "A1" },
      { name: "Doritos", price: 250, gridCoord: "A2" },
      { name: "Lays", price: 250, gridCoord: "A3" },
      { name: "Peanuts", price: 200, gridCoord: "B1" },
      { name: "Granola", price: 200, gridCoord: "B2" },
      { name: "Oreos", price: 200, gridCoord: "B3" },
      { name: "Gum", price: 150, gridCoord: "C1" },
      { name: "Mint", price: 150, gridCoord: "C2" },
      { name: "Lozenge", price: 150, gridCoord: "C3" }
    ];
    this.items = this.createItems();
  }

  /**
   * createItems creates a full inventory of Snack objects
   */
  createItems() {
    let selectionArray = [];
    for (let index = 0; index < this.inventoryGridLimit; index++) {
      let slot = {};
      slot = {
        slotName: this.snackChoices[index].name,
        slotQuantity: [],
        gridCoord: this.snackChoices[index].gridCoord,
        price: this.snackChoices[index].price
      };
      for (let j = 0; j < this.inventorySlotLimit; j++) {
        let snack = new Snack(this.snackChoices[index].name);
        slot.slotQuantity.push(snack);
      }
      selectionArray.push(slot);
    }
    return selectionArray;
  }

  refillAll() {
    this.items.forEach(slot => {
      while (slot.slotQuantity.length < this.inventorySlotLimit) {
        let snack = new Snack(slot.slotName);
        slot.slotQuantity.push(snack);
      }
    });

    return this.toString();
  }

  dispenseSnack(gridInput) {
    let snack = this.items.find(slot => {
      return slot.gridCoord === gridInput;
    });

    let result = snack.slotQuantity.pop();
    return result;
  }

  checkPrice(gridInput) {
    let snack = this.items.find(slot => {
      return slot.gridCoord === gridInput;
    });
    return snack.price;
  }

  toString() {
    return JSON.stringify(this.items, 0, 2);
  }
}

module.exports = Inventory;
