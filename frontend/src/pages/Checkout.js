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
  updateCustomerCity,
  useGetAllSellers,
  getLatestOrder,
  getTransactionToken,
  getTransactionTokenAll,
  getLatestShipping,
  insertShipping,
  insertPayment,
  insertOrder,
  insertOrderPerSeller,
  insertOrderDetail,
  insertTransactionEffe,
  insertTransactionLumiere,
  insertTransactionZalya,
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
// each seller's product id's unique identifier. P = Effe, C = Lumiere, F = Zalya.
const sellerProductId = ["C", "F", "P"];
const sellerNames = ["Lumiere", "Zalya", "Effe"];

const Checkout = ({ user }) => {
  // midtrans snap initiation
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute("data-client-key", " 	SB-Mid-client-qRblT6mkL5qyO3HK");
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

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

  // set state for customer address
  const [currentAddress, setCurrentAddress] = useState();

  // get seller data
  const { data: sellersFetch } = useGetAllSellers();
  const [sellers, setSellers] = useState();

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

  // define province select options
  const provinceOptions = provinceData.map((data) => ({
    value: data.province_id,
    label: data.province,
  }));

  // define shipping company / courier options
  const shippingOptions = [
    { value: "jne", label: "JNE" },
    { value: "pos", label: "POS Indonesia" },
    { value: "tiki", label: "TIKI" },
  ];

  useEffect(() => {
    console.log(currentProvince);
    // if current province is chosen, show the dropdown for cities for that province
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

  // set seller to fetched seller data from database
  useEffect(() => {
    if (sellersFetch && sellersFetch.length > 0) {
      setSellers(sellersFetch);
    }
  }, [sellersFetch]);

  useEffect(() => {
    if (customerFetch && customerFetch.length > 0) {
      // set initial city and province to data from customer database if they are not empty
      setCustomer(customerFetch[0][0]);
      if (customerFetch[0][0].city) {
        const cityProvince = {
          value: cityData.find(
            (city) => city.city_name === customerFetch[0][0].city
          ).province_id,
          label: cityData.find(
            (city) => city.city_name === customerFetch[0][0].city
          ).province,
        };
        console.log("SUP", cityProvince);
        setCurrentProvince(cityProvince);
        setCurrentCity({
          value: cityData.find(
            (city) => city.city_name === customerFetch[0][0].city
          ).city_id,
          label: customerFetch[0][0].city,
        });
      }
    }
  }, [customerFetch]);

  // change handler for city dropdown
  const handleCurrentCityChange = async (currentCity) => {
    setCurrentCity(currentCity);
    const res = await updateCustomerCity(user, currentCity.label);
  };

  // change handler for shipping service type dropdown
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

  // get shipping info from rajaongkir
  async function handleGetShipping(index) {
    if (currentCity && currentProvince && currentShipping) {
      const weight = productsBySeller[index].reduce(
        (acc, item) => acc + item.weight,
        0
      );

      const sellerCityId = getSellerCityId(index);
      const rajaOngkirRes = await axios.post(
        "http://localhost:8086/api/shipping/rajaongkir",
        {
          origin: sellerCityId,
          destination: currentCity.value,
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

  function getSellerCityId(index) {
    if (sellers) {
      const sellerCityId = cityData.find(
        (city) => city.city_name === sellers[index].city
      ).city_id;
      return sellerCityId;
    }
  }

  async function handleBayar(index) {
    const latest_order = await (await getLatestOrder()).data[0][0];
    let order_number =
      parseInt(latest_order.order_number.replace("OR", "")) + 1;
    order_number = "OR" + order_number;
    const total_cost =
      productsBySeller[index].reduce((acc, item) => acc + item.price, 0) +
      currentShippingTypes[index].cost;
    console.log(productsBySeller[index].concat(currentShippingTypes[index]));
    const transaction_info = {
      order_id: order_number,
      gross_amount: total_cost,
      items: productsBySeller[index].concat(currentShippingTypes[index]),
      cust_first_name: customer.first_name,
      cust_last_name: customer.last_name,
      cust_email: customer.email,
      cust_phone: customer.phone,
      cust_address: currentAddress,
      cust_city: currentCity.label,
      cust_postal_code: cityData.find(
        (city) => city.city_id === currentCity.value
      ).postal_code,
      seller_id: sellers.find(
        (seller) => sellerNames[index] === seller.seller_name
      ).seller_id,
      seller_name: sellerNames[index],
      seller_address: sellers[index].address,
      seller_city: sellers[index].city,
      seller_postal_code: cityData.find(
        (city) => city.city_name === sellers[index].city
      ).postal_code,
    };
    const trans_data = await getTransactionToken(transaction_info);
  }

  const isPayValid = () => {
    const valid =
      ((productsBySeller[0].length > 0 &&
        currentShippingTypes[0]?.service?.length > 0) ||
        !productsBySeller[0].length > 0) &&
      ((productsBySeller[1].length > 0 &&
        currentShippingTypes[1]?.service?.length > 0) ||
        !productsBySeller[1].length > 0) &&
      ((productsBySeller[2].length > 0 &&
        currentShippingTypes[2]?.service?.length > 0) ||
        !productsBySeller[2].length > 0) &&
      (currentAddress?.length > 0 || customer?.address?.length > 0);
    return valid;
  };

  async function handlePayment() {
    console.log(isPayValid());
    if (isPayValid()) {
      const latest_order = await (await getLatestOrder()).data[0][0];
      let order_number =
        parseInt(latest_order.order_number.replace("OR", "")) + 1;
      order_number = "OR" + order_number;
      const items = [];
      for (let j = 0; j < productsBySeller.length; j++) {
        if (productsBySeller[j].length > 0) {
          const curr_items = productsBySeller[j]
            .map((item) => ({
              id: item.product_id,
              price: item.unit_price,
              quantity: item.quantity,
              name: item.product_name.replace(/[^\w\s]/gi, "").slice(0, 50),
              brand: item.brand,
              merchant: sellerNames[j],
              category: item.category,
            }))
            .concat([
              {
                id: `shipping-${sellerNames[j].toLowerCase()}`,
                price: currentShippingTypes[j].cost,
                name: currentShippingTypes[j].description,
                quantity: 1,
              },
            ]);
          for (let i = 0; i < curr_items.length; i++) {
            items.push(curr_items[i]);
          }
        }
      }

      console.log(items);
      const total_cost = items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      const transaction_info = {
        order_id: order_number,
        gross_amount: total_cost,
        items: items,
        cust_first_name: customer.first_name,
        cust_last_name: customer.last_name,
        cust_email: customer.email,
        cust_phone: customer.phone,
        cust_address: currentAddress,
        cust_city: currentCity.label,
        cust_postal_code: cityData.find(
          (city) => city.city_id === currentCity.value
        ).postal_code,
      };

      const trans = await getTransactionTokenAll(transaction_info);
      const token = trans.data?.token;
      console.log("token", token);
      if (token) {
        window.snap.pay(token, {
          onSuccess: async (result) => {
            console.log(result);

            const shipping_number_arr = [null, null, null];

            //insert shipping info into shipping database
            for (let i = 0; i < currentShippingTypes.length; i++) {
              if (currentShippingTypes[i]?.service?.length > 0) {
                const latest_shipping = await (
                  await getLatestShipping()
                ).data[0][0];
                let shipping_number =
                  parseInt(latest_shipping.shipping_number.replace("SH", "")) +
                  1;
                shipping_number = "SH" + shipping_number;
                console.log("shipping number", shipping_number);
                shipping_number_arr[i] = shipping_number;
                const shipping_data = {
                  shipping_number: shipping_number,
                  shipping_company: currentShipping.label,
                  sender_name: sellerNames[i],
                  sender_city: sellers[i].city,
                  sender_address: sellers[i].address,
                  receiver_name: customer.first_name + " " + customer.last_name,
                  receiver_city: currentCity.label,
                  receiver_address:
                    currentAddress?.length > 0
                      ? currentAddress
                      : customer.address,
                  shipping_type: currentShippingTypes[i].service,
                  product_weight: productsBySeller[i].reduce(
                    (acc, item) => acc + item.weight,
                    0
                  ),
                  shipping_fee: currentShippingTypes[i].cost,
                };
                console.log("shipping_data", shipping_data);
                const res_shipping = await insertShipping(shipping_data);
              }
            }

            console.log("shipping number arr", shipping_number_arr);

            // insert transaction info into payment database
            const transaction_data = {
              fraud_status: result.fraud_status,
              gross_amount: result.gross_amount,
              order_id: result.order_id,
              payment_type: result.payment_type,
              pdf_url: result.pdf_url,
              status_code: result.status_code,
              status_message: result.status_message,
              transaction_id: result.transaction_id,
              transaction_status: result.transaction_status,
              transaction_time: result.transaction_time,
            };
            console.log("transaction data", transaction_data);
            const res_payment = await insertPayment(transaction_data);

            //insert order data into order table on ecommerce database
            const order_data = {
              order_number: order_number,
              cust_id: customer.cust_id,
              total_payment: total_cost,
              transaction_id: token,
            };

            console.log("order data", order_data);
            const res_order = await insertOrder(order_data);

            // insert order per seller for each seller in the order into order per seller table on ecommerce database
            for (let i = 0; i < productsBySeller.length; i++) {
              if (productsBySeller[i].length > 0) {
                const orderperseller_data = {
                  order_number: order_number,
                  cust_id: customer.cust_id,
                  seller_id: sellers[i].seller_id,
                  shipping_id: shipping_number_arr[i],
                  payment_amount:
                    productsBySeller[i].reduce(
                      (acc, item) => acc + item.price,
                      0
                    ) + currentShippingTypes[i].cost,
                };
                console.log("order per seller data", orderperseller_data);
                const res_orderperseller = await insertOrderPerSeller(
                  orderperseller_data
                );
              }
            }

            // insert order detail for each product into order detail table in dbecommerce
            for (let i = 0; i < products.length; i++) {
              const orderdetail_data = {
                order_number: order_number,
                product_id: products[i].product_id,
                quantity: products[i].quantity,
                total_price: products[i].price,
              };
              console.log("order detail data", orderdetail_data);
              const res_orderdetail = await insertOrderDetail(orderdetail_data);
            }

            // insert transaction data into transaction table for each seller db
            for (let i = 0; i < products.length; i++) {
              const sellertrans_data = {
                order_number: order_number,
                transaction_id: token,
                payment_type: result.payment_type,
                cust_id: customer.cust_id,
                product_id: products[i].product_id,
                quantity: products[i].quantity,
                unit_price: products[i].unit_price,
                total_price: products[i].price,
              };
              console.log(sellertrans_data);
              if (sellertrans_data.product_id[0] == "C") {
                const res_sellertrans = await insertTransactionLumiere(
                  sellertrans_data
                );
              } else if (sellertrans_data.product_id[0] == "F") {
                const res_sellertrans = await insertTransactionZalya(
                  sellertrans_data
                );
              } else if (sellertrans_data.product_id[0] == "P") {
                const res_sellertrans = await insertTransactionEffe(
                  sellertrans_data
                );
              }
            }

            navigate("/orderdetail", {
              replace: true,
              state: {
                products: products,
                transaction_data: transaction_data,
                productsBySeller: productsBySeller,
                order_number: order_number,
                customer: customer,
                address:
                  currentAddress?.length > 0
                    ? currentAddress
                    : customer.address,
                city: currentCity,
                province: currentProvince,
                currentShippingTypes: currentShippingTypes,
                currentShipping: currentShipping,
                shipping_number_arr: shipping_number_arr,
              },
            }); // this one works only if user has visited the base url
            // window.location.replace("/");
          },
        });
      }
    } else {
      window.alert("Tolong isi alamat, kota, dan shipping yang diinginkan!");
    }
  }

  function getShippingCost() {
    let shipping_cost = 0;
    for (let i = 0; i < currentShippingTypes.length; i++) {
      if (currentShippingTypes[i]?.service?.length > 0) {
        shipping_cost += currentShippingTypes[i].cost;
      }
    }
    return shipping_cost;
  }

  return (
    <div className="checkout-container">
      {/* <img className="wave-cart-header" src="img/wave/Rectangle 44.png"></img> */}
      <h3 className="checkout-title">Checkout</h3>
      <div className="checkout-content-container">
        <div className="checkout-address-wrapper">
          <div className="checkout-address-container">
            <CheckoutAddress
              user={customer}
              handleAddressChange={(newAddress) =>
                setCurrentAddress(newAddress)
              }
            />

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
                onChange={handleCurrentCityChange}
                options={availableCities}
                isSearchable={true}
                placeholder="Masukkan kota Anda..."
              />
            ) : (
              ""
            )}
          </div>
          <div className="checkout-list-wrapper">
            {productsBySeller.map((sellerProducts, index1) =>
              sellerProducts.length > 0 ? (
                <div key={`pesanan-${index1}`}>
                  <h2>{`Pesanan Toko ${sellerNames[index1]}`}</h2>
                  {sellerProducts.map((item, index2) => (
                    <CheckoutItemRow
                      key={`checkout-item-${index2}`}
                      product={item}
                      image={imageArray[index2 % 6]}
                    />
                  ))}
                  <button className = "btn-shipping" onClick={() => handleGetShipping(index1)}>
                    Dapatkan shipping
                  </button>
                  {availableShipping[index1]?.length > 0 ? (
                    <div className = "btn-shipping-choose">
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
                      <div className="shipping-information-detail">
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
                  {currentShippingTypes[index1].service ? (
                    <div className = "shipping-information-detail">
                      {"Total: Rp " +
                        (
                          productsBySeller[index1].reduce(
                            (acc, item) => acc + item.price,
                            0
                          ) + currentShippingTypes[index1].cost
                        ).toLocaleString()}
                      {/* <button onClick={() => handleBayar(index1)}>Bayar</button> */}
                    </div>
                  ) : null}
                </div>
              ) : null
            )}
          </div>
        </div>
        <div className="checkout-payment-wrapper">
          <div className="pay-method-container">
            <h2>Metode Pengiriman</h2>                
            <Select
              menuPortalTarget={document.body}
              styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
              value={currentShipping}
              onChange={(newShipping) => setCurrentShipping(newShipping)}
              options={shippingOptions}
              placeholder="Pilih kurir"
            />
          </div>

          <div className="order-summary-container">
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
            <button className="order-pay-button" onClick={handlePayment}>
              Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
