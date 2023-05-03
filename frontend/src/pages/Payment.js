import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import PaymentItemRow from "../components/payment/PaymentItemRow";
import PaymentAddress from "../components/payment/PaymentAddress";
import OrderSummary from "../components/checkout/OrderSummary";
import Countdown from "../components/payment/Countdown";
import { useGetCustomerFromCustId } from "../services/checkout";
import "../styles/payment.css";
const imageArray = [
  "/img/batman.jpg",
  "/img/barbie.jpeg",
  "/img/harrypotter.jpg",
  "/img/princess.jpg",
  "/img/batman.jpg",
  "/img/mlp.jpg",
];

const Payment = ({ user }) => {
  const {state} = useLocation();
  console.log(state);
  const products = state.products;
  const paymentType = state.paymentType;
  const orderID = state.orderID;
  console.log(products);
  console.log(paymentType);
  console.log(orderID);
  const { data: customerFetch } = useGetCustomerFromCustId(user);
  const [customer, setCustomer] = useState(user);

  const total_product_price = products.reduce(
    (acc, item) => acc + item.price,
    0
  );

  useEffect(() => {
    if (customerFetch && customerFetch.length > 0) {
      setCustomer(customerFetch[0][0]);
    }
  }, [customerFetch]);


  return (
    <div className="payment-container">
      <img className="wave-payment-header-top" src="img/wave/Intersect (2).png"></img>
      <img className="wave-payment-header-bottom" src="img/wave/Intersect (3).png"></img>
      <h3 className="payment-title">Payment</h3>
      <div className="payment-content-container">
        <div className="payment-count-information-wrapper">
          <div className="payment-count-container">
            <div className="payment-count">
              <Countdown /> 
            </div>
          </div>
          <div className="payment-information">
            <h2>Payment Information</h2>
            <h4>{paymentType}</h4>
            <div className="payment-information-detail">
              <div className = "detail-title">
                <p>Virtual Account Number</p>
                <p>Order Number</p>
                <p>Total Payment</p>
                <p>Status</p>
              </div>
              <div className = "detail-value">
                <p>1800010968040</p>
                <p>{orderID}</p>
                <p>{"$" + (total_product_price + 10).toFixed(2)}</p>
                <p>unpaid</p>
              </div>
            </div>
            <button className="cancel-order-button">
              Cancel Order
            </button>
          </div>
        </div>
        <div className="payment-product-wrapper">
          <div className="payment-product-container">
            <h2>Products</h2>
            {products && products.length > 0 ? (
              products.map((item, index) => {
                return (
                  <PaymentItemRow
                    product={item}
                    image={imageArray[index % 6]}
                  />
                );
              })
            ) : (
              <p className="no-items-cart">No items in cart</p>
            )}
          </div>

          <div className="payment-order-summary-container">
            <OrderSummary product_price={total_product_price} />
            <div className="total-pay-wrapper">
              <p>Total</p>
              <p className="total-pay-price">
                {"$" + (total_product_price + 10).toFixed(2)}
              </p>
            </div>
            <div className = "payment-address-container">
              <PaymentAddress user={customer} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
