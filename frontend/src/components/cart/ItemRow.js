import React from "react";
import CartQuantity from "./CartQuantity";
import { useEffect, useState } from "react";
import { updateCartQuantity, deleteCart } from "../../services/cart";

const ItemRow = ({
  product,
  image,
  checkAll,
  checkedIdPrice,
  updateCheckedIdPrice,
  cart,
  updateCart,
  index,
}) => {
  const [quantity, setQuantity] = useState(product.quantity);
  const [isChecked, setIsChecked] = useState(false);

  const capitalizeFirst = (str) => {
    const str2 = str.charAt(0).toUpperCase() + str.slice(1);
    return str2;
  };

  const handleChange = (event) => {
    setIsChecked(event.target.checked);
    let newChecked = [...checkedIdPrice];
    if (event.target.checked) {
      newChecked.push({
        product_id: product.product_id,
        product_name: product.product_name,
        category: product.category,
        brand: product.brand,
        weight: product.weight,
        quantity: quantity,
        price: parseFloat(product.price * quantity),
        unit_price: product.price,
      });
    } else {
      newChecked = newChecked.filter(function (obj) {
        return obj.product_id !== product.product_id;
      });
    }
    updateCheckedIdPrice(newChecked);
    console.log(newChecked);
  };

  async function updateQuantity(newQuantity) {
    setQuantity(newQuantity);
    let newCart = [...cart];

    newCart[index].quantity = newQuantity;
    updateCart(newCart);
    if (isChecked) {
      let newChecked = [...checkedIdPrice];
      console.log("h", newChecked);
      const newIndex = newChecked.findIndex(
        (item) => item.product_id == product.product_id
      );
      console.log(newIndex);
      newChecked[newIndex].quantity = newQuantity;
      newChecked[newIndex].price = product.price * newQuantity;
      updateCheckedIdPrice(newChecked);
      console.log(newChecked);
    }

    const res = await updateCartQuantity(product, newQuantity);
  }

  useEffect(
    function () {
      let newChecked = [];
      if (checkAll) {
        setIsChecked(true);

        newChecked.push(...checkedIdPrice, {
          product_id: product.product_id,
          product_name: product.product_name,
          category: product.category,
          brand: product.brand,
          weight: product.weight,
          quantity: quantity,
          price: parseFloat(product.price * quantity),
          unit_price: product.price,
        });
      } else {
        // setIsChecked(false);
        newChecked = checkedIdPrice.filter(function (obj) {
          return obj.product_id !== product.product_id;
        });
      }
      updateCheckedIdPrice(newChecked);
      console.log(checkedIdPrice);
    },
    [checkAll]
  );

  async function handleDelete(item) {
    const res = await deleteCart(item);
    let newCart = [...cart];
    let newChecked = [...checkedIdPrice];
    newCart = newCart.filter(function (obj) {
      return obj.product_id !== item.product_id;
    });
    newChecked = checkedIdPrice.filter(function (obj) {
      return obj.product_id !== product.product_id;
    });
    updateCart(newCart);
    updateCheckedIdPrice(newChecked);
    console.log(newCart);
  }

  useEffect(
    function () {
      let newItem = cart.find((item) => item.product_id === product.product_id);
      setQuantity(newItem.quantity);
    },
    [cart]
  );
  return (
    <div className="item-row-wrapper">
      <label className="item-checkbox">
        <input type="checkbox" checked={isChecked} onChange={handleChange} />
      </label>
      <img className="item-image" src={image} />
      <div className="item-information-wrapper">
        <p>{product.product_name.replace(/[^\w\s]/gi, "")}</p>
        <p>{capitalizeFirst(product.category)}</p>
        <p>{product.weight / 100 + " kg/item"}</p>
        <p>{"Rp " + parseInt(product.price).toLocaleString()}</p>
      </div>
      <CartQuantity quantity={quantity} updateQuantity={updateQuantity} />
      <div className="item-quantity-price-container">
        <p className="item-quantity-price">
          {"Rp " + parseInt(product.price * quantity).toLocaleString()}
        </p>
      </div>

      <img
        className="cart-delete-icon"
        src="/icons/cart-trash.svg"
        onClick={() => handleDelete(product)}
      />
    </div>
  );
};

export default ItemRow;
