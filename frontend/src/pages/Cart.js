import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ItemRow from "../components/cart/ItemRow";
import { useGetCustomerCartProducts } from "../services/cart";
import "../styles/cart.css";
const imageArray = [
  "/img/batman.jpg",
  "/img/barbie.jpeg",
  "/img/harrypotter.jpg",
  "/img/princess.jpg",
  "/img/batman.jpg",
  "/img/mlp.jpg",
];

//SELECT ALL IMPLEMENTATION INCOMPLETE
//Checkbox states after delete is a bit bugged

const Cart = ({ user }) => {
  const cust_id = user.cust_id;
  const { data: cartFetch } = useGetCustomerCartProducts(user);

  const [cart, setCart] = useState([]);
  const [checkedIdPrice, setCheckedIdPrice] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkAll, setCheckAll] = useState(false);

  const handleChange = (event) => {
    setCheckAll(event.target.checked);
  };

  useEffect(() => {
    if (cartFetch && cartFetch.length > 0) {
      setCart(cartFetch[0]);
    }
  }, [cartFetch]);

  function updateCheckedIdPrice(data) {
    setCheckedIdPrice(data);
  }

  function getTotalChecked(array) {
    console.log("array in sum", array);
    if (array.length > 0) {
      const sum = array.reduce((accumulator, object) => {
        return accumulator + object.price;
      }, 0);
      console.log(sum);
      return sum;
    } else {
      return 0;
    }
  }

  useEffect(
    function () {
      setTotalPrice(getTotalChecked(checkedIdPrice));
    },
    [checkedIdPrice]
  );

  function updateCart(newCart) {
    setCart(newCart);
  }

  return (
    <div className="cart-container">
      <img className="wave-cart-header" src="img/wave/Rectangle 43.png"></img>
      <h3 className="cart-title">Your cart</h3>
      <div className="cart-order-container">
        <div className="cart-wrapper">
          <div className="item-list-wrapper">
            {cart && cart.length > 0 ? (
              cart.map((item, index) => {
                return (
                  <ItemRow
                    product={item}
                    image={imageArray[index % 6]}
                    checkAll={checkAll}
                    checkedIdPrice={checkedIdPrice}
                    updateCheckedIdPrice={updateCheckedIdPrice}
                    cart={cart}
                    updateCart={updateCart}
                    index={index}
                    key={index}
                  />
                );
              })
            ) : (
              <p className="no-items-cart">No items in cart</p>
            )}
            {cart && cart.length > 0 ? (
              <label className="select-all">
                <input
                  type="checkbox"
                  checked={checkAll}
                  onChange={handleChange}
                />
                Select all
              </label>
            ) : (
              <span></span>
            )}
          </div>
          <div className="cart-total-price-wrapper">
            <p>Total</p>
            <p>{"$" + totalPrice.toFixed(2)}</p>
          </div>
        </div>
        <div className="cart-summary-wrapper">
          <h2 className="cart-summary-title">Order Summary</h2>
          <div className="cart-summary-price-wrapper">
            <p>Total product price</p>
            <p>{"$" + totalPrice.toFixed(2)}</p>
          </div>
          <div className="cart-summary-btn">
            <Link
              style={{ textDecoration: "none" }}
              replace={true}
              state={checkedIdPrice}
              to="/checkout"
            >
              <button className="cart-checkout-btn">Checkout</button>
            </Link>
            <Link
              style={{ textDecoration: "none" }}
              replace={true}
              to="/products"
            >
              <button className="cart-back-to-shopping-btn">
                Back to shopping
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
