import React, { useState, useEffect } from "react";
import { paymentMethodData } from "../../constants/paymentMethodData";

const PaymentMethod = ({ handleChange }) => {
  const [payMethod, setPayMethod] = useState("");

  const handlePayMethodChange = (event) => {
    setPayMethod(event.target.value);
    handleChange(event.target.value);
  };

  return (
    <div className="payment-method-wrapper">
      <h2>Payment Method</h2>
      <form className="payment-dropdown">
        <label htmlFor="payMethod"></label>
        <select
          className="payment-select"
          id="payMethod"
          value={payMethod}
          onChange={handlePayMethodChange}
        >
          <option value="">Choose payment method</option>
          {paymentMethodData.map((method, index) => {
            return (
              <option value={method.bank} key={index}>
                {method.bank}
              </option>
            );
          })}
        </select>
      </form>
    </div>
  );
};

export default PaymentMethod;
