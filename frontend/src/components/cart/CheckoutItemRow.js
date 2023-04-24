import React from "react";
import CartQuantity from "./CartQuantity";
import { useEffect, useState } from "react";
import { updateCartQuantity, deleteCart } from "../../services/cart";

const CheckoutItemRow = ({ product, image }) => {
  return (
    <div className="item-row-wrapper">
      <img className="item-image" src={image} />
      <div className="item-information-wrapper">
        <p>{product.name}</p>
        <p>{product.weight / 100 + " kg/item"}</p>
        <p>{"$" + parseFloat(product.unit_price).toFixed(2)}</p>
      </div>
      <div className="item-quantity-price-container">
        <p className="item-quantity-price">{"$" + product.price.toFixed(2)}</p>
      </div>
      <p>{product.quantity + " items"}</p>
    </div>
  );
};

export default CheckoutItemRow;
