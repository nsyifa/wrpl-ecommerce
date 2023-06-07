import React from "react";

const OrderSummary = ({ product_price, shipping_cost }) => {
  return (
    <div className="order-summary-wrapper">
      <h2 className="order-summary-header">Order Summary</h2>
      <div className="order-list-wrapper">
        <div className="order-list-item">
          <p>Total product price</p>
          <p>{"Rp" + product_price.toFixed(2)}</p>
        </div>
        <div className="order-list-item">
          <p>Shipping cost</p>
          <p>{shipping_cost}</p>
        </div>
        <div className="order-list-item-discount">
          <p>Product discount</p>
          <p>- Rp0.00</p>
        </div>
        <div className="order-list-item-discount">
          <p>Shipping discount</p>
          <p>- Rp0.00</p>
        </div>
        <div className="order-list-item-discount">
          <p>Promo coupon discount</p>
          <p>- Rp0.00</p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
