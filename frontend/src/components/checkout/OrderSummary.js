import React from "react";

const OrderSummary = ({ product_price }) => {
  return (
    <div className="order-summary-wrapper">
      <h2 className="order-summary-header">Order Summary</h2>
      <div className="order-list-wrapper">
        <div className="order-list-item">
          <p>Total product price</p>
          <p>{"$" + product_price}</p>
        </div>
        <div className="order-list-item">
          <p>Shipping cost</p>
          <p>$10.00</p>
        </div>
        <div className="order-list-item">
          <p>Sales tax</p>
          <p>$5.00</p>
        </div>
        <div className="order-list-item-discount">
          <p>Product discount</p>
          <p>- $0.00</p>
        </div>
        <div className="order-list-item-discount">
          <p>Shipping discount</p>
          <p>- $5.00</p>
        </div>
        <div className="order-list-item-discount">
          <p>Promo coupon discount</p>
          <p>- $0.00</p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
