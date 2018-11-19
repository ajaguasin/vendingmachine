import React, { Component } from "react";
import "./App.css";
import VendingMachine from "./classes/vendingMachine/VendingMachine.js";
import Slot from "./components/Slot";

class App extends Component {
  constructor() {
    super();
    this.VendingMachine = new VendingMachine();
    this.state = {
      ...this.VendingMachine
    };
  }
  render() {
    console.log(this.state);
    return (
      <div className="app">
        <h1>Vending Machine</h1>
        <div className="vendingMachine">
          {this.state.inventory.items.map((item, index) => {
            return (
              <Slot
                key={index}
                slotName={item.slotName}
                slotQuantity={item.slotQuantity}
                gridCoord={item.gridCoord}
                price={item.price}
              />
            );
          })}
        </div>
        <div className="controls">
          <div className="moneyButtons">
            <button
              onClick={() => {
                this.VendingMachine.inputMoney("toonie");
              }}
            >
              Input $2
            </button>
            <button
              onClick={() => {
                this.VendingMachine.inputMoney("loonie");
                console.log(this.state);
              }}
            >
              Input $1
            </button>
            <button>Input $0.25</button>
            <button>Input $0.10</button>
            <button>Input $0.05</button>
          </div>

          <button>Input Code</button>
          <button>Get Change</button>
          <button>Show Inventory</button>
          <div className="screen">
            <p className="moneyInput">
              {this.state.vendingRegister.customerTotal}
            </p>
            <p className="change" />
            <p className="inventory" />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
