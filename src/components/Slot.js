import React from "react";

const Slot = ({ slotName, slotQuantity, gridCoord, price }) => {
  return (
    <div className="slot">
      <div>
        {slotName}: ${price / 100}
      </div>
      <div>Quantity: {slotQuantity.length}</div>
      <button>{gridCoord}</button>
    </div>
  );
};

export default Slot;
