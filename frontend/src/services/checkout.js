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

export const updateCustomerAddress = async (user, new_address) => {
  try {
    const res = await axios.put(
      "http://localhost:8080/api/data/customer/address/update",
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
      "http://localhost:8080/api/data/orders/latest",
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

export const insertPayment = async (payment_id, payment_type) => {
  try {
    const res = await axios.post("http://localhost:8080/api/data/payments", {
      payment_id: payment_id,
      payment_type: payment_type,
    });
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

export const insertOrder = async (
  order_number,
  cust_id,
  shipper_id,
  payment_id,
  ship_date,
  status
) => {
  try {
    const res = await axios.post("http://localhost:8080/api/data/orders", {
      order_number: order_number,
      cust_id: cust_id,
      shipper_id: shipper_id,
      payment_id: payment_id,
      ship_date: ship_date,
      status: status,
    });
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

export const insertOrderDetail = async (
  order_number,
  product_id,
  quantity,
  total_price
) => {
  try {
    const res = await axios.post(
      "http://localhost:8080/api/data/orderdetails",
      {
        order_number: order_number,
        product_id: product_id,
        quantity: quantity,
        total_price: total_price,
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
