import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import CheckoutItemRow from "../components/cart/CheckoutItemRow";
import CheckoutAddress from "../components/checkout/CheckoutAddress";
import PaymentMethod from "../components/checkout/PaymentMethod";
import OrderSummary from "../components/checkout/OrderSummary";
import {
  useGetCustomerFromCustId,
  getLatestOrder,
  getLatestPayment,
  getAllShippers,
  insertPayment,
  insertOrder,
  insertOrderDetail,
} from "../services/checkout";
import "../styles/checkout.css";
const imageArray = [
  "/img/batman.jpg",
  "/img/barbie.jpeg",
  "/img/harrypotter.jpg",
  "/img/princess.jpg",
  "/img/batman.jpg",
  "/img/mlp.jpg",
];

const Checkout = ({ user }) => {
  const { state } = useLocation();
  const products = state;
  const { data: customerFetch } = useGetCustomerFromCustId(user);
  const [customer, setCustomer] = useState(user);

  const [paymentMethod, setPaymentMethod] = useState("");

  const total_product_price = products.reduce(
    (acc, item) => acc + item.price,
    0
  );

  function handlePaymentMethodChange(new_pay_method) {
    setPaymentMethod(new_pay_method);
  }

  useEffect(() => {
    if (customerFetch && customerFetch.length > 0) {
      setCustomer(customerFetch[0][0]);
    }
  }, [customerFetch]);

  async function handlePay() {
    if (paymentMethod.length > 0) {
      const latest_payment = await (await getLatestPayment()).data[0][0];
      let payment_id =
        parseInt(latest_payment.payment_id.replace("PA", "")) + 1;
      payment_id = "PA" + payment_id;

      const res1 = await insertPayment(payment_id, paymentMethod);
      const shippers = await (await getAllShippers()).data[0];
      const random_shipper =
        shippers[Math.floor(Math.random() * shippers.length)];
      const shipper_id = random_shipper.shipper_id;

      const latest_order = await (await getLatestOrder()).data[0][0];
      let order_number =
        parseInt(latest_order.order_number.replace("O", "")) + 1;
      order_number = "O" + order_number;

      const res2 = await insertOrder(
        order_number,
        user.cust_id,
        shipper_id,
        payment_id,
        null,
        "Belum Dibayar"
      );

      for (let i = 0; i < products.length; i++) {
        let res3 = await insertOrderDetail(
          order_number,
          products[i].product_id,
          products[i].quantity,
          products[i].price
        );
      }

      window.alert("Successfully paid and ordered!");
    }
  }

  return (
    <div className="checkout-container">
      <img className="wave-cart-header" src="img/wave/Rectangle 44.png"></img>
      <h3 className="checkout-title">Checkout</h3>
      <div className="checkout-content-container">
        <div className="checkout-address-wrapper">
          <div className="checkout-address-container">
            <CheckoutAddress user={customer} />
          </div>
          <div className="checkout-list-wrapper">
            <h2>Products</h2>
            {products && products.length > 0 ? (
              products.map((item, index) => {
                return (
                  <CheckoutItemRow
                    product={item}
                    image={imageArray[index % 6]}
                  />
                );
              })
            ) : (
              <p className="no-items-cart">No items in cart</p>
            )}
          </div>
        </div>
        <div className="checkout-payment-wrapper">
          <div className="pay-method-container">
            <PaymentMethod handleChange={handlePaymentMethodChange} />
          </div>

          <div className="order-summary-container">
            <OrderSummary product_price={total_product_price} />
            <div className="total-pay-wrapper">
              <p>Total</p>
              <p className="total-pay-price">
                {"$" + (total_product_price + 10)}
              </p>
            </div>
            <button className="order-pay-button" onClick={handlePay}>
              Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
