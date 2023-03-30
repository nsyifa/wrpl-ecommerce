import { useEffect, useState } from "react";
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
          <p>No items in cart</p>
        )}
        <label>
          <input type="checkbox" checked={checkAll} onChange={handleChange} />
          Select all
        </label>
        <div className="cart-total-price-wrapper">
          <p>Total</p>
          <p>{"$" + totalPrice.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
