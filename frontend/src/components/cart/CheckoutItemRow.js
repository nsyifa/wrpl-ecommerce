import React from "react";
import CartQuantity from "./CartQuantity";
import { useEffect, useState } from "react";
import { updateCartQuantity, deleteCart } from "../../services/cart";

const CheckoutItemRow = ({ product, image }) => {
  const capitalizeFirst = (str) => {
    const str2 = str.charAt(0).toUpperCase() + str.slice(1);
    return str2;
  };
  return (
    <div className="item-row-wrapper">
      <img className="item-image" src={image} />
      <div className="item-information-wrapper">
        <p>{product.product_name.replace(/[^\w\s]/gi, "")}</p>
        <p>{capitalizeFirst(product.category)}</p>
        <p>{"Rp " + parseInt(product.unit_price).toLocaleString()}</p>
      </div>
      <div className="checkout-item-quantity-price-container">
        <p className="checkout-item-quantity-price">
          {"Rp " + product.price.toLocaleString()}
        </p>
      </div>
      <p className="checkout-product-quantity">{product.quantity + " items"}</p>
    </div>
  );
};

export default CheckoutItemRow;
