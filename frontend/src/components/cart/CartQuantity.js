import React from "react";

const CartQuantity = ({ quantity, updateQuantity }) => {
  return (
    <div className="cart-quantity-button-wrapper">
      {" "}
      <button
        className="cart-quantity-button"
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
        className="cart-quantity-button"
        onClick={() => updateQuantity(quantity + 1)}
      >
        +
      </button>
    </div>
  );
};

export default CartQuantity;
