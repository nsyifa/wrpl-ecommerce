import React from "react";

const Quantity = ({ quantity, stock, updateQuantity }) => {
  return (
    <div className="quantity-wrapper">
      <p className="quantity-title">Kuantitas</p>
      <div className = "quantity-detail-wrapper">
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
            className="quantity-button plus"
            onClick={() => updateQuantity(quantity + 1)}
          >
            +
          </button>
        </div>

        <p>Tersisa <b>{stock}</b> stok</p>
      </div>
    </div>
  );
};

export default Quantity;
