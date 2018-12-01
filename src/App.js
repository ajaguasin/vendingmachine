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
      inventoryOutput: {},
      coinChange: this.VendingMachine.vendingRegister.changeresults
    };
  }

  componentDidMount() {
    this.formatInventoryOutput();
  }

  formatInventoryOutput = () => {
    let obj = {};

    JSON.parse(this.VendingMachine.printInventory()).map(e => {
      obj[`${e.slotName}`] = e.slotQuantity.length;
    });
    this.setState({ inventoryOutput: obj });
  };
  render() {
    const register = this.VendingMachine.vendingRegister;
    return (
      <div className="app">
        <Grid className="vendingMachine" container={true} direction={"row"}>
          {this.VendingMachine.inventory.items.map((item, index) => {
            return (
              <Slot
                changeDue={register.changeDue}
                key={index}
                item={item}
                setGridInput={() => this.VendingMachine.setGridInput()}
                dispenseSnack={item => this.VendingMachine.dispenseSnack(item)}
                formatInventoryOutput={() => this.formatInventoryOutput()}
              />
            );
          })}
        </Grid>

        <div className="controls">
          <Grid
            container={true}
            direction="column"
            justify="space-around"
            className="controlGridCont"
          >
            <Grid className="moneyButtons" item={true}>
              {Object.entries(register.customerInput).map((el, index) => {
                return (
                  <Button
                    key={index}
                    style={{ margin: 10 }}
                    variant="contained"
                    color="primary"
                    disabled={register.changeDue > 0}
                    onClick={() => {
                      this.VendingMachine.inputMoney(el[0]);
                      this.setState({
                        register: this.state.register
                      });
                    }}
                  >{`Input ${el[0]}`}</Button>
                );
              })}
            </Grid>
            <Grid item={true} className="controlGridItem">
              <Button
                className="grid2Buttons"
                variant="contained"
                color="primary"
                disabled={register.changeDue > 0}
                onClick={() => {
                  this.VendingMachine.refillAll();
                  this.setState({ ...this.state });
                }}
              >
                Refill Inventory
              </Button>

              <Button
                className="grid2Buttons"
                variant="contained"
                color="primary"
                onClick={() => {
                  this.setState({
                    coinChange: this.VendingMachine.getChange()
                  });
                }}
              >
                Get Change
              </Button>
            </Grid>
            <Grid item={true} xs={12} md={12} lg={12} className="screen">
              <p className="moneyInput">
                {`You've inputted: $${this.state.register.customerTotal / 100}`}
              </p>
              <p className="change">
                {`Change: $${register.changeDue / 100}`}{" "}
              </p>
              <p className="coinChange">{`Change coin results: ${Object.entries(
                register.changeresults.coinQuantity
              )}`}</p>
              <p className="msg">{this.VendingMachine.message}</p>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default App;
