import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import IconItems from "./IconItems";

const Slot = ({ item, dispenseSnack, formatInventoryOutput, changeDue }) => {
  return (
    <Grid
      item={true}
      xs={4}
      md={4}
      lg={4}
      style={{ backgroundColor: "rgb(44, 45, 47)" }}
    >
      <Card className="slot">
        <CardContent className="cardContent">
          <Typography variant="title" color="secondary">
            {item.slotName}: ${item.price / 100}
          </Typography>
          <Typography
            variant="subheading"
            className="subHeading"
            color="secondary"
          >
            Quantity: {item.slotQuantity.length}
          </Typography>
          <Button
            className="slotButton"
            variant="contained"
            color="primary"
            disabled={changeDue > 0}
            onClick={() => {
              dispenseSnack(item.gridCoord);
              formatInventoryOutput();
            }}
          >
            {item.gridCoord}
          </Button>
        </CardContent>
        <CardContent className="cardIcon">
          <IconItems slotQuantity={item.slotQuantity} />
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Slot;
