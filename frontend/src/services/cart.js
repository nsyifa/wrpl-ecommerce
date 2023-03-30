import axios from "axios";
import { useEffect, useState } from "react";

export const useGetCustomerCartProducts = (user) => {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || !user.cust_id) {
      setError(new Error("user or user.cust_id is undefined"));
      return;
    }
    axios
      .get(`http://localhost:8080/api/data/cart`, {
        params: {
          cust_id: user.cust_id,
        },
      })
      .then((res) => {
        if (!res.data) throw new Error("error on get all cart info");
        setCart(res.data ? res.data : "");
        console.log("sup", res);
      })
      .catch((err) => {
        setError(err);
      });
  }, [user]);

  return { data: cart, error: error };
};

export const deleteCart = async (item) => {
  console.log(item);
  try {
    const res = await axios.delete(
      `http://localhost:8080/api/data/cart/${item.cust_id}/${item.product_id}`
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

export const updateCartQuantity = async (item, quantity) => {
  try {
    const res = await axios.put(
      "http://localhost:8080/api/data/cart/update",
      null,
      {
        params: {
          cust_id: item.cust_id,
          product_id: item.product_id,
          quantity: quantity,
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

export const addCartQuantity = async (cust_id, product_id, add_quantity) => {
  try {
    const res = await axios.post("http://localhost:8080/api/data/cart/add", {
      cust_id: cust_id,
      product_id: product_id,
      add_quantity: add_quantity,
    });
    console.log(res);

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
