import React, { Component } from "react";
import "./App.css";
import VendingMachine from "./classes/vendingMachine/VendingMachine.js";
import Slot from "./components/Slot";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import IconItems from "./components/IconItems";

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
      <React.Fragment>
        <Grid container={true} className="header" justify="center">
          <Grid item={true}>
            <Typography variant="h4">TDD Vending Machine</Typography>
          </Grid>
        </Grid>
        <div className="app">
          <Grid className="vendingMachine" container={true} direction={"row"}>
            {this.VendingMachine.inventory.items.map((item, index) => {
              return (
                <Slot
                  changeDue={register.changeDue}
                  key={index}
                  item={item}
                  setGridInput={() => this.VendingMachine.setGridInput()}
                  dispenseSnack={item =>
                    this.VendingMachine.dispenseSnack(item)
                  }
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
              <Grid
                item={true}
                className="instructions"
                align="center"
                justify="space-between"
              >
                <Typography variant="h5" color="error">
                  {" "}
                  Instructions{" "}
                </Typography>
                <Typography variant="subheading" color="error">
                  Input coins
                </Typography>
                <Typography variant="subheading" color="error">
                  Choose a snack
                </Typography>
                <Typography variant="subheading" color="error">
                  Return Change
                </Typography>
              </Grid>
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
                <div>
                  <p className="moneyInput">
                    {`You've inputted: $${this.state.register.customerTotal /
                      100}`}
                  </p>
                  <p className="change">
                    {`Change due: $${register.changeDue / 100}`}{" "}
                  </p>
                  <p className="coinChange">{`You got back: ${Object.entries(
                    register.changeresults.coinQuantity
                  )}`}</p>
                  <p className="msg">{this.VendingMachine.message}</p>
                </div>
                <div className="output">
                  {register.changeDue > 0 && <IconItems slotQuantity={[1]} />}
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
