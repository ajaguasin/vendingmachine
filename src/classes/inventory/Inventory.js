const Snack = require("../snack/Snack");

class Inventory {
  constructor() {
    this.inventorySlotLimit = 3;
    this.inventoryGridLimit = 9;
    this.snackChoices = [
      { name: "Cheetos", price: 2.5, gridCoord: "A1" },
      { name: "Doritos", price: 2.5, gridCoord: "A2" },
      { name: "Lays", price: 2.5, gridCoord: "A3" },
      { name: "Peanuts", price: 2, gridCoord: "B1" },
      { name: "Granola", price: 2, gridCoord: "B2" },
      { name: "Oreos", price: 2, gridCoord: "B3" },
      { name: "Gum", price: 1.5, gridCoord: "C1" },
      { name: "Mint", price: 1.5, gridCoord: "C2" },
      { name: "Lozenge", price: 1.5, gridCoord: "C3" }
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
        gridCoord: this.snackChoices[index].gridCoord
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
      if (slot.slotQuantity.length < this.inventorySlotLimit) {
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

  toString() {
    return JSON.stringify(this.items);
  }
}

module.exports = Inventory;
