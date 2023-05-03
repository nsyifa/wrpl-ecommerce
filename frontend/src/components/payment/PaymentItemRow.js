import React from "react";
import CartQuantity from "../cart/CartQuantity";
import { useEffect, useState } from "react";
import { updateCartQuantity, deleteCart } from "../../services/cart";

const PaymentItemRow = ({ product, image }) => {
  return (
    <div className="payment-item-row-wrapper">
      <img className="payment-item-image" src={image} />
      <div className="payment-item-information-wrapper">
        <p className="product-name">{product.name}</p>
        <p>{product.weight / 100 + " kg/item"}</p>
        <p>{"$" + parseFloat(product.unit_price).toFixed(2)}</p>
      </div>
      <div className="payment-item-quantity-price-container">
        <p className="payment-product-quantity">{product.quantity + " items"}</p>
        <p className="payment-item-quantity-price">{"$" + product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default PaymentItemRow;
