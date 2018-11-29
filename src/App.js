import React, { Component } from "react";
import "./App.css";
import VendingMachine from "./classes/vendingMachine/VendingMachine.js";
import Slot from "./components/Slot";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

class App extends Component {
  constructor() {
    super();
    this.VendingMachine = new VendingMachine();
    this.state = {
      register: this.VendingMachine.vendingRegister,
      inventoryOutput: this.formatInventoryOutput()
    };
  }

  formatInventoryOutput = () => {
    let obj = {};

    JSON.parse(this.VendingMachine.printInventory()).map(e => {
      obj[`${e.slotName}`] = e.slotQuantity.length;
    });

    return obj;
  };
  render() {
    const register = this.VendingMachine.vendingRegister;
    console.log(this.state);
    return (
      <div className="app">
        <Grid
          className="vendingMachine"
          container={true}
          direction={"row"}
          // wrap={"wrap"}
        >
          {this.VendingMachine.inventory.items.map((item, index) => {
            return (
              <Slot
                key={index}
                item={item}
                setGridInput={() => this.VendingMachine.setGridInput()}
                dispenseSnack={item => this.VendingMachine.dispenseSnack(item)}
                formatInventoryOutput={() => this.formatInventoryOutput()}
              />
            );
          })}
        </Grid>

        <Grid container={true} className="controls">
          <div className="moneyButtons">
            {Object.entries(register.customerInput).map((el, index) => {
              return (
                <Button
                  key={index}
                  variant="contained"
                  color="default"
                  onClick={() => {
                    this.VendingMachine.inputMoney(el[0]);
                    this.setState({
                      register: this.state.register
                    });
                  }}
                >{`Input ${el[0]}`}</Button>
              );
            })}
          </div>
          <Grid item={true}>
            <Button variant="contained" color="default">
              Refill Inventory
            </Button>

            <Button variant="contained" color="default">
              Get Change
            </Button>
          </Grid>
          <Grid item={true} xs={12} md={12} lg={12} className="screen">
            <p className="moneyInput">
              {`You've inputted: $${this.state.register.customerTotal / 100}`}
            </p>
            <p className="change" />
            <p>{this.state.inventoryOutput["Cheetos"]}</p>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
