import React from "react";

const Quantity = ({ quantity, stock, updateQuantity }) => {
  return (
    <div className="quantity-wrapper">
      <p>Quantity</p>
      <div className="quantity-button-wrapper">
        {" "}
        <button
          className="quantity-button"
          onClick={() => {
            if (quantity > 0) {
              updateQuantity(quantity - 1);
            }
          }}
        >
          -
        </button>
        <p>{quantity}</p>
        <button
          className="quantity-button"
          onClick={() => updateQuantity(quantity + 1)}
        >
          +
        </button>
      </div>

      <p>{stock + " stocks left"}</p>
    </div>
  );
};

export default Quantity;
