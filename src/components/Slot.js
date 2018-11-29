import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

const Slot = ({ item, dispenseSnack, formatInventoryOutput, setGridInput }) => {
  return (
    <Grid item={true} xs={4} md={4} lg={4}>
      <Card className="slot">
        <CardContent>
          <Typography>
            {item.slotName}: ${item.price / 100}
          </Typography>
          <Typography>Quantity: {item.slotQuantity.length}</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              // console.log(dispenseSnack);
              dispenseSnack(item.gridCoord);
              formatInventoryOutput();
            }}
          >
            {item.gridCoord}
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Slot;
