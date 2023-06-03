import axios from "axios";
import { useEffect, useState } from "react";

export const useGetCustomerFromCustId = (user) => {
  const [customer, setCustomer] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || !user.cust_id) {
      setError(new Error("user or cust_id is undefined"));
      return;
    }
    axios
      .get(`http://localhost:8081/api/customer/customers/cust_id`, {
        params: {
          cust_id: user.cust_id,
        },
      })
      .then((res) => {
        if (!res.data) throw new Error("error on get customer info");
        setCustomer(res.data ? res.data : "");
      })
      .catch((err) => {
        setError(err);
      });
  }, [user]);

  return { data: customer, error: error };
};

export const useGetAllSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8085/api/ecommerce/sellers`, {})
      .then((res) => {
        if (!res.data) throw new Error("error on get seller info");
        setSellers(res.data ? res.data : "");
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  return { data: sellers, error: error };
};

export const updateCustomerAddress = async (user, new_address) => {
  try {
    const res = await axios.put(
      "http://localhost:8081/api/customer/address/update",
      null,
      {
        params: {
          cust_id: user.cust_id,
          new_address: new_address,
        },
      }
    );
    if (!res.data.ok) throw new Error(res.data.error);

    return {
      ok: true,
      data: res.data,
    };
  } catch (error) {
    return {
      ok: false,
    };
  }
};

export const updateCustomerCity = async (user, new_city) => {
  try {
    const res = await axios.put(
      "http://localhost:8081/api/customer/city/update",
      null,
      {
        params: {
          cust_id: user.cust_id,
          new_city: new_city,
        },
      }
    );
    if (!res.data.ok) throw new Error(res.data.error);

    return {
      ok: true,
      data: res.data,
    };
  } catch (error) {
    return {
      ok: false,
    };
  }
};

export const getTransactionToken = async (transaction_info) => {
  const shipping_item =
    transaction_info.items[transaction_info.items.length - 1];
  const data = {
    transaction_details: {
      order_id: transaction_info.order_id,
      gross_amount: transaction_info.gross_amount,
    },
    credit_card: {
      secure: true,
    },
    item_details: transaction_info.items
      .slice(0, -1)
      .map((item) => ({
        id: item.product_id,
        price: item.unit_price,
        quantity: item.quantity,
        name: item.product_name.replace(/[^\w\s]/gi, "").slice(0, 50),
        brand: item.brand,
        category: item.category,
      }))
      .concat([
        {
          id: "shipping",
          price: shipping_item.cost,
          name: shipping_item.description,
          quantity: 1,
        },
      ]),
    customer_details: {
      first_name: transaction_info.cust_first_name,
      last_name: transaction_info.cust_last_name,
      email: transaction_info.cust_email,
      phone: transaction_info.cust_phone,
      billing_address: {
        first_name: transaction_info.cust_first_name,
        last_name: transaction_info.cust_last_name,
        email: transaction_info.cust_email,
        phone: transaction_info.cust_phone,
        address: transaction_info.cust_adress,
        city: transaction_info.cust_city,
        postal_code: transaction_info.cust_postal_code,
        country_code: "IDN",
      },
      shipping_address: {
        first_name: transaction_info.cust_first_name,
        last_name: transaction_info.cust_last_name,
        email: transaction_info.cust_email,
        phone: transaction_info.cust_phone,
        address: transaction_info.cust_adress,
        city: transaction_info.cust_city,
        postal_code: transaction_info.cust_postal_code,
        country_code: "IDN",
      },
    },
    seller_details: {
      id: transaction_info.seller_id,
      name: transaction_info.seller_name,
      email: "placeholder@email.com",
      url: "https://placeholderurl.com",
      address: {
        first_name: "Placeholder",
        last_name: "Name",
        phone: "0811111111111",
        address: transaction_info.seller_address,
        city: transaction_info.seller_city,
        postal_code: transaction_info.seller_postal_code,
        country_code: "IDN",
      },
    },
  };
  console.log("gross", data.transaction_details.gross_amount);
  console.log("items", data.item_details);
  try {
    const res = await axios.post(
      "http://localhost:8085/api/ecommerce/transaction",
      data
    );
    console.log(res);

    if (!res.data) throw new Error(res.data.error);

    return {
      ok: true,
      data: res.data,
    };
  } catch (error) {
    return {
      ok: false,
    };
  }
};

export const getTransactionTokenAll = async (transaction_info) => {
  const data = {
    transaction_details: {
      order_id: transaction_info.order_id,
      gross_amount: transaction_info.gross_amount,
    },
    credit_card: {
      secure: true,
    },
    item_details: transaction_info.items,
    customer_details: {
      first_name: transaction_info.cust_first_name,
      last_name: transaction_info.cust_last_name,
      email: transaction_info.cust_email,
      phone: transaction_info.cust_phone,
      billing_address: {
        first_name: transaction_info.cust_first_name,
        last_name: transaction_info.cust_last_name,
        email: transaction_info.cust_email,
        phone: transaction_info.cust_phone,
        address: transaction_info.cust_adress,
        city: transaction_info.cust_city,
        postal_code: transaction_info.cust_postal_code,
        country_code: "IDN",
      },
      shipping_address: {
        first_name: transaction_info.cust_first_name,
        last_name: transaction_info.cust_last_name,
        email: transaction_info.cust_email,
        phone: transaction_info.cust_phone,
        address: transaction_info.cust_adress,
        city: transaction_info.cust_city,
        postal_code: transaction_info.cust_postal_code,
        country_code: "IDN",
      },
    },
  };
  console.log("gross", data.transaction_details.gross_amount);
  console.log("items", data.item_details);
  try {
    const res = await axios.post(
      "http://localhost:8085/api/ecommerce/transaction",
      data
    );
    console.log(res);

    if (!res.data) throw new Error(res.data.error);

    return {
      ok: true,
      data: res.data,
    };
  } catch (error) {
    return {
      ok: false,
    };
  }
};

export const getLatestShipping = async () => {
  try {
    const res = await axios.get(
      "http://localhost:8086/api/shipping/latest",
      null
    );
    if (!res.data) throw new Error(res.data.error);

    return {
      ok: true,
      data: res.data,
    };
  } catch (error) {
    return {
      ok: false,
    };
  }
};

export const insertShipping = async (shipping_data) => {
  try {
    const res = await axios.post(
      "http://localhost:8086/api/shipping/create",
      shipping_data
    );
    console.log(res);

    if (!res.data) throw new Error(res.data.error);

    return {
      ok: true,
      data: res.data,
    };
  } catch (error) {
    return {
      ok: false,
    };
  }
};

export const insertPayment = async (transaction_data) => {
  try {
    const res = await axios.post(
      "http://localhost:8087/api/payment/create",
      transaction_data
    );
    console.log(res);

    if (!res.data) throw new Error(res.data.error);

    return {
      ok: true,
      data: res.data,
    };
  } catch (error) {
    return {
      ok: false,
    };
  }
};

export const insertOrder = async (order_data) => {
  try {
    const res = await axios.post(
      "http://localhost:8085/api/ecommerce/order",
      order_data
    );
    console.log(res);

    if (!res.data) throw new Error(res.data.error);

    return {
      ok: true,
      data: res.data,
    };
  } catch (error) {
    return {
      ok: false,
    };
  }
};

export const insertOrderPerSeller = async (orderperseller_data) => {
  try {
    const res = await axios.post(
      "http://localhost:8085/api/ecommerce/orderperseller",
      orderperseller_data
    );
    console.log(res);

    if (!res.data) throw new Error(res.data.error);

    return {
      ok: true,
      data: res.data,
    };
  } catch (error) {
    return {
      ok: false,
    };
  }
};

export const insertOrderDetail = async (orderdetail_data) => {
  try {
    const res = await axios.post(
      "http://localhost:8085/api/ecommerce/orderdetail",
      {
        order_number: orderdetail_data.order_number,
        product_id: orderdetail_data.product_id,
        quantity: orderdetail_data.quantity,
        total_price: orderdetail_data.total_price,
      }
    );
    console.log(res);

    if (!res.data) throw new Error(res.data.error);

    return {
      ok: true,
      data: res.data,
    };
  } catch (error) {
    return {
      ok: false,
    };
  }
};

export const insertTransactionLumiere = async (lumieretrans_data) => {
  try {
    const res = await axios.post(
      "http://localhost:8083/api/lumiere/transaction",
      lumieretrans_data
    );
    console.log(res);

    if (!res.data) throw new Error(res.data.error);

    return {
      ok: true,
      data: res.data,
    };
  } catch (error) {
    return {
      ok: false,
    };
  }
};

export const insertTransactionZalya = async (zalyatrans_data) => {
  try {
    const res = await axios.post(
      "http://localhost:8084/api/zalya/transaction",
      zalyatrans_data
    );
    console.log(res);

    if (!res.data) throw new Error(res.data.error);

    return {
      ok: true,
      data: res.data,
    };
  } catch (error) {
    return {
      ok: false,
    };
  }
};

export const insertTransactionEffe = async (effetrans_data) => {
  try {
    const res = await axios.post(
      "http://localhost:8082/api/effe/transaction",
      effetrans_data
    );
    console.log(res);

    if (!res.data) throw new Error(res.data.error);

    return {
      ok: true,
      data: res.data,
    };
  } catch (error) {
    return {
      ok: false,
    };
  }
};

export const getLatestPayment = async () => {
  try {
    const res = await axios.get(
      "http://localhost:8080/api/data/payments/latest",
      null
    );
    if (!res.data) throw new Error(res.data.error);

    return {
      ok: true,
      data: res.data,
    };
  } catch (error) {
    return {
      ok: false,
    };
  }
};

export const getLatestOrder = async () => {
  try {
    const res = await axios.get(
      "http://localhost:8085/api/ecommerce/order/latest",
      null
    );
    if (!res.data) throw new Error(res.data.error);

    return {
      ok: true,
      data: res.data,
    };
  } catch (error) {
    return {
      ok: false,
    };
  }
};

export const getAllShippers = async () => {
  try {
    const res = await axios.get(
      "http://localhost:8080/api/data/shippers",
      null
    );
    if (!res.data) throw new Error(res.data.error);

    return {
      ok: true,
      data: res.data,
    };
  } catch (error) {
    return {
      ok: false,
    };
  }
};

// export const insertPayment = async (payment_id, payment_type) => {
//   try {
//     const res = await axios.post("http://localhost:8080/api/data/payments", {
//       payment_id: payment_id,
//       payment_type: payment_type,
//     });
//     console.log(res);

//     if (!res.data) throw new Error(res.data.error);

//     return {
//       ok: true,
//       data: res.data,
//     };
//   } catch (error) {
//     return {
//       ok: false,
//     };
//   }
// };

// export const insertOrder = async (
//   order_number,
//   cust_id,
//   shipper_id,
//   payment_id,
//   ship_date,
//   status
// ) => {
//   try {
//     const res = await axios.post("http://localhost:8080/api/data/orders", {
//       order_number: order_number,
//       cust_id: cust_id,
//       shipper_id: shipper_id,
//       payment_id: payment_id,
//       ship_date: ship_date,
//       status: status,
//     });
//     console.log(res);

//     if (!res.data) throw new Error(res.data.error);

//     return {
//       ok: true,
//       data: res.data,
//     };
//   } catch (error) {
//     return {
//       ok: false,
//     };
//   }
// };

// export const insertOrderDetail = async (
//   order_number,
//   product_id,
//   quantity,
//   total_price
// ) => {
//   try {
//     const res = await axios.post(
//       "http://localhost:8080/api/data/orderdetails",
//       {
//         order_number: order_number,
//         product_id: product_id,
//         quantity: quantity,
//         total_price: total_price,
//       }
//     );
//     console.log(res);

//     if (!res.data) throw new Error(res.data.error);

//     return {
//       ok: true,
//       data: res.data,
//     };
//   } catch (error) {
//     return {
//       ok: false,
//     };
//   }
// };
