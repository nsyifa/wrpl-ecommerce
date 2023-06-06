import React from "react";
import { useLocation } from "react-router-dom";
import CheckoutItemRow from "../components/cart/CheckoutItemRow";
import OrderSummary from "../components/checkout/OrderSummary";
import "../styles/checkout.css";
const imageArray = [
  "/img/batman.jpg",
  "/img/barbie.jpeg",
  "/img/harrypotter.jpg",
  "/img/princess.jpg",
  "/img/batman.jpg",
  "/img/mlp.jpg",
];

const OrderDetail = () => {
  const { state } = useLocation();
  const order_info = state;
  const sellerNames = ["Lumiere", "Zalya", "Effe"];
  const currentDate = new Date();
  const options = { day: "numeric", month: "long", year: "numeric" };

  const formattedDate = currentDate.toLocaleDateString("id-ID", options);
  const formatString = (str) => {
    // Convert underscore-separated words to an array of words
    const words = str.split("_");

    // Capitalize the first letter of each word and join them back
    const formattedString = words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return formattedString;
  };
  const total_product_price = order_info.products.reduce(
    (acc, item) => acc + item.price,
    0
  );
  function getShippingCost() {
    let shipping_cost = 0;
    for (let i = 0; i < order_info.currentShippingTypes.length; i++) {
      if (order_info.currentShippingTypes[i]?.service?.length > 0) {
        shipping_cost += order_info.currentShippingTypes[i].cost;
      }
    }
    return shipping_cost;
  }

  return (
    <div>
      <div className="checkout-container">
        <img className="wave-cart-header" src="img/wave/Rectangle 44.png"></img>
        <h2 className="checkout-title" style={{ fontFamily: "Inter" }}>
          Order detail
        </h2>

        <div className="checkout-content-container">
          <div
            className="checkout-list-wrapper"
            style={{ height: "min-content" }}
          >
            {order_info.productsBySeller.map((sellerProducts, index1) =>
              sellerProducts.length > 0 ? (
                <div key={`pesanan-${index1}`}>
                  <h2>{`Pesanan Toko ${sellerNames[index1]}`}</h2>
                  {sellerProducts.map((item, index2) => (
                    <CheckoutItemRow
                      key={`checkout-item-${index2}`}
                      product={item}
                      image={
                        imageArray[
                          (index1 * sellerProducts.length + index2) % 6
                        ]
                      }
                    />
                  ))}
                </div>
              ) : null
            )}
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", width: "100%" }}
          >
            <div className="order-summary-container">
              <h2>Detail Transaksi</h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <p>Transaction ID</p>
                <p>{order_info.transaction_data.transaction_id}</p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <p>Transaction Status</p>
                <p>COMPLETED</p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <p>Order ID</p>
                <p>{order_info.order_number}</p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <p>Order Date</p>
                <p>{formattedDate}</p>
              </div>
            </div>
            <div
              className="order-summary-container"
              style={{ height: "min-content" }}
            >
              <OrderSummary
                product_price={total_product_price}
                shipping_cost={getShippingCost()}
              />
              <div className="total-pay-wrapper">
                <p>Total</p>
                <p className="total-pay-price">
                  {"Rp " +
                    (total_product_price + getShippingCost()).toLocaleString()}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <p>Payment Date</p>
                  <p>{formattedDate}</p>
                </div>
                <div>
                  <p>Via</p>
                  <p>
                    {formatString(order_info.transaction_data.payment_type)}
                  </p>
                </div>
              </div>
            </div>

            <div className="order-summary-container">
              <h2>Shipping Details</h2>
              <p>Address</p>
              <p>
                {`${order_info.customer.first_name} ${order_info.customer.last_name} | ${order_info.customer.phone}`}
              </p>
              <p>{`${order_info.address}, ${order_info.city.label}, ${order_info.province.label}`}</p>
              <p>Courier</p>
              <p>{order_info.currentShipping.label}</p>
              {order_info.currentShippingTypes.map((shippingType, index1) =>
                shippingType.service?.length > 0 ? (
                  <div key={index1}>
                    <h3>{sellerNames[index1]}</h3>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <p>Shipping ID</p>
                      <p>{order_info.shipping_number_arr[index1]}</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <p>Shipping Cost</p>
                      <p>{"Rp " + shippingType.cost.toLocaleString()}</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <p>Shipping Type</p>
                      <p>
                        {shippingType.service +
                          " (" +
                          shippingType.description +
                          ")"}
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <p>ETD</p>
                      <p>{shippingType.etd + " hari"}</p>
                    </div>
                  </div>
                ) : null
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
