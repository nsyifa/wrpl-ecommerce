import React from "react";
import { useLocation } from "react-router-dom";

const OrderDetail = () => {
  const { state } = useLocation();
  const order_info = state;
  return (
    <div>
      <h2>Order detail</h2>

      <p>{order_info.order_number}</p>
      <p>{order_info.address}</p>
    </div>
  );
};

export default OrderDetail;
