import React, { Component } from "react";
import "./App.css";
import VendingMachine from "./classes/vendingMachine/VendingMachine.js";
import Slot from "./components/Slot";
import { FaBeer } from "react-icons/fa";

class App extends Component {
  constructor() {
    super();
    this.VendingMachine = new VendingMachine();
    this.state = {
      register: this.VendingMachine.vendingRegister,
      inventoryOutput: ""
    };
  }
  render() {
    const register = this.VendingMachine.vendingRegister;
    console.log(this.state);
    return (
      <div className="app">
        <div className="vendingMachine">
          {this.VendingMachine.inventory.items.map((item, index) => {
            return (
              <Slot
                key={index}
                item={item}
                dispenseSnack={() => this.VendingMachine.dispenseSnack}
              />
            );
          })}
        </div>

        <div className="controls">
          <div className="moneyButtons">
            {Object.entries(register.customerInput).map((el, index) => {
              return (
                <button
                  key={index}
                  onClick={() => {
                    this.VendingMachine.inputMoney(el[0]);
                    this.setState({
                      register: this.state.register
                    });
                  }}
                >{`Input ${el[0]}`}</button>
              );
            })}
          </div>
          <div>
            <button>Input Code</button>
            <button>Get Change</button>
            <button
              onClick={() => {
                this.setState({
                  inventoryOutput: this.VendingMachine.printInventory()
                });
              }}
            >
              Show Inventory
            </button>
          </div>
          <div className="screen">
            <p className="moneyInput">
              {`You've inputted: $${this.state.register.customerTotal / 100}`}
            </p>
            <p className="change" />
            <p className="inventory">{this.state.inventoryOutput}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
