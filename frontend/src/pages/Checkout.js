import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import CheckoutItemRow from "../components/cart/CheckoutItemRow";
import CheckoutAddress from "../components/checkout/CheckoutAddress";
import PaymentMethod from "../components/checkout/PaymentMethod";
import OrderSummary from "../components/checkout/OrderSummary";
import { cityData } from "../constants/cityData";
import { provinceData } from "../constants/provinceData";
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
const rajaongkir_api_key = "cebede57946ae90275354d457c56888a";
// each seller's product id's unique identifier. P = Effe, C = Lumiere, F = Zalya.
const sellerProductId = ["C", "F", "P"];

const Checkout = ({ user }) => {
  // get products from cart
  const { state } = useLocation();
  const products = state;
  console.log("products", products);
  let paymentType;
  let orderID;
  const navigate = useNavigate();

  // get customer data
  const { data: customerFetch } = useGetCustomerFromCustId(user);
  const [customer, setCustomer] = useState(user);

  // set province and city
  const [currentProvince, setCurrentProvince] = useState();
  const [currentCity, setCurrentCity] = useState();
  const [availableCities, setAvailableCities] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");

  // set shipping courier
  const [currentShipping, setCurrentShipping] = useState();

  // set available shipping types
  const [availableShipping, setAvailableShipping] = useState([[], [], []]);

  // set current shipping type for each seller
  const [currentShippingTypes, setCurrentShippingTypes] = useState([
    [],
    [],
    [],
  ]);

  // get array of products separated by seller
  let productsBySeller = [[], [], []];
  for (let i = 0; i < sellerProductId.length; i++) {
    productsBySeller[i] = products.filter((item) =>
      item.product_id.includes(sellerProductId[i])
    );
  }
  console.log("shop separated produts", productsBySeller);
  // calculate total product price of order
  const total_product_price = products.reduce(
    (acc, item) => acc + item.price,
    0
  );

  const provinceOptions = provinceData.map((data) => ({
    value: data.province_id,
    label: data.province,
  }));

  const shippingOptions = [
    { value: "jne", label: "JNE" },
    { value: "pos", label: "POS Indonesia" },
    { value: "tiki", label: "TIKI" },
  ];

  useEffect(() => {
    console.log(currentProvince);
    if (currentProvince?.value) {
      const cityOptions = cityData
        .filter((data) => data.province_id === currentProvince.value)
        .map((data) => ({
          value: data.city_id,
          label: data.city_name,
        }));
      setAvailableCities(cityOptions);
      console.log(cityOptions);
    }
  }, [currentProvince]);

  function handlePaymentMethodChange(new_pay_method) {
    setPaymentMethod(new_pay_method);
  }

  useEffect(() => {
    if (customerFetch && customerFetch.length > 0) {
      setCustomer(customerFetch[0][0]);
    }
  }, [customerFetch]);

  function handleCurrentShippingTypesChange(event, index) {
    const shipType = JSON.parse(event.target.value);
    setCurrentShippingTypes((prevShippingTypes) => {
      const newShippingTypes = [...prevShippingTypes]; // Create a shallow copy of the state array
      newShippingTypes[index] = {
        service: shipType.service,
        description: shipType.description,
        cost: shipType.cost[0].value,
        etd: shipType.cost[0].etd,
      }; // Modify the desired subarray
      return newShippingTypes; // Update the state with the modified copy
    });
    console.log("Shipping", currentShippingTypes);
  }

  async function handleGetShipping(index) {
    if (currentCity && currentProvince && currentShipping) {
      const weight = productsBySeller[index].reduce(
        (acc, item) => acc + item.weight,
        0
      );
      const rajaOngkirRes = await axios.post(
        "http://localhost:8086/api/shipping/rajaongkir",
        {
          origin: currentCity.value,
          destination: "419",
          weight: weight,
          courier: currentShipping.value,
        }
      );
      console.log("ONGKIR", rajaOngkirRes.data.rajaongkir.results[0]);
      setAvailableShipping((prevShippings) => {
        const newShippings = [...prevShippings]; // Create a shallow copy of the state array
        newShippings[index] = rajaOngkirRes.data.rajaongkir.results[0].costs; // Modify the desired subarray
        return newShippings; // Update the state with the modified copy
      });
    }
  }

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
      orderID = order_number;
      paymentType = paymentMethod;

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

      navigate("/payment", {
        state: {
          products: products,
          paymentType: paymentType,
          orderID: orderID,
        },
      });
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

            {/* reminder: the select components select the id value, NOT name */}
            <Select
              menuPortalTarget={document.body}
              styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
              value={currentProvince}
              onChange={(newProvince) => setCurrentProvince(newProvince)}
              options={provinceOptions}
              isSearchable={true}
              placeholder="Masukkan provinsi Anda..."
            />
            {availableCities?.length > 0 ? (
              <Select
                menuPortalTarget={document.body}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                value={currentCity}
                onChange={(newCity) => setCurrentCity(newCity)}
                options={availableCities}
                isSearchable={true}
                placeholder="Masukkan kota Anda..."
              />
            ) : (
              ""
            )}
          </div>
          <div className="checkout-list-wrapper">
            {/* <h2>Products</h2>
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
            )} */}
            {productsBySeller.map((sellerProducts, index1) =>
              sellerProducts.length > 0 ? (
                <div key={`pesanan-${index1}`}>
                  <h2>{`Pesanan ${index1 + 1}`}</h2>
                  {sellerProducts.map((item, index2) => (
                    <CheckoutItemRow
                      key={`checkout-item-${index2}`}
                      product={item}
                      image={imageArray[index2 % 6]}
                    />
                  ))}
                  <button onClick={() => handleGetShipping(index1)}>
                    Dapatkan shipping
                  </button>
                  {availableShipping[index1]?.length > 0 ? (
                    <div>
                      <select
                        value={currentShippingTypes[index1]}
                        onChange={() =>
                          handleCurrentShippingTypesChange(event, index1)
                        }
                      >
                        <option value="">Pilih shipping</option>
                        {availableShipping[index1].map((shippingType) => (
                          <option
                            key={shippingType.service}
                            value={JSON.stringify(shippingType)}
                          >
                            {shippingType.service +
                              `${shippingType.description}`}
                          </option>
                        ))}
                      </select>
                      <div>
                        {/* Selected option:{" "}
                            {currentShippingTypes[index1].cost[0].value +
                              "etd: " +
                              currentShippingTypes[index1].cost[0].etd} */}
                        {currentShippingTypes[index1].service ? (
                          <React.Fragment>
                            <p>
                              {"Pelayanan: " +
                                currentShippingTypes[index1].service +
                                " (" +
                                currentShippingTypes[index1].description +
                                ")"}
                            </p>
                            <p>
                              {"Ongkos Kirim: " +
                                currentShippingTypes[index1].cost}
                            </p>
                            <p>
                              {"Estimasi Hari Pengiriman: " +
                                currentShippingTypes[index1].etd}
                            </p>
                          </React.Fragment>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : null
            )}
          </div>
        </div>
        <div className="checkout-payment-wrapper">
          <div className="pay-method-container">
            <PaymentMethod handleChange={handlePaymentMethodChange} />
          </div>

          <Select
            menuPortalTarget={document.body}
            styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
            value={currentShipping}
            onChange={(newShipping) => setCurrentShipping(newShipping)}
            options={shippingOptions}
            placeholder="Pilih kurir"
          />

          <div className="order-summary-container">
            <OrderSummary product_price={total_product_price} />
            <div className="total-pay-wrapper">
              <p>Total</p>
              <p className="total-pay-price">
                {"$" + (total_product_price + 10).toFixed(2)}
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
