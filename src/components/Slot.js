import React from "react";

const Slot = ({ item, dispenseSnack }) => {
  return (
    <div className="slot">
      <div>
        {item.slotName}: ${item.price / 100}
      </div>
      <div>Quantity: {item.slotQuantity.length}</div>
      <button
        onClick={() => {
          dispenseSnack(item.gridInput);
        }}
      >
        {item.gridCoord}
      </button>
    </div>
  );
};

export default Slot;
