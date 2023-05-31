import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ItemRow from "../components/cart/ItemRow";
import { useGetCustomerCart } from "../services/cart";
import axios from "axios";
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
  const apiUrlEffe = "http://localhost:8082";
  const apiUrlLumiere = "http://localhost:8083";
  const apiUrlZalya = "http://localhost:8084";

  const { data: cartFetch } = useGetCustomerCart(user);

  const [cart, setCart] = useState([]);
  const [productData, setProductData] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [checkedIdPrice, setCheckedIdPrice] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkAll, setCheckAll] = useState(false);

  const handleChange = (event) => {
    setCheckAll(event.target.checked);
  };

  const productDataFetch = async () => {
    const response_effe = await axios.get(`${apiUrlEffe}/api/effe/products`);
    const response_lumiere = await axios.get(
      `${apiUrlLumiere}/api/lumiere/products`
    );
    const response_zalya = await axios.get(`${apiUrlZalya}/api/zalya/products`);
    console.log(response_effe.data);
    const response_data = response_effe.data.concat(
      response_lumiere.data,
      response_zalya.data
    );
    console.log(response_data);
    setProductData(response_data);
    return response_data;
  };

  useEffect(function () {
    productDataFetch();
  }, []);

  useEffect(() => {
    if (cartFetch && cartFetch.length > 0) {
      setCart(cartFetch);
    }
  }, [cartFetch]);

  useEffect(
    function () {
      if (cart?.length > 0 && productData?.length > 0) {
        let cartProductId = cart.map((product) => product.product_id);
        let productsInCart = productData.filter((product) =>
          cartProductId.includes(product.product_id)
        );
        for (let i = 0; i < productsInCart.length; i++) {
          productsInCart[i].quantity =
            cart[
              cart.findIndex(
                (item) => item.product_id == productsInCart[i].product_id
              )
            ].quantity;
          productsInCart[i].cust_id = cust_id;
        }
        setCartProducts(productsInCart);
        console.log("products and quantity", productsInCart);
      }
    },
    [cart, productData]
  );

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

  function updateCartProducts(newCart) {
    setCartProducts(newCart);
  }

  return (
    <div className="cart-container">
      <h3 className="cart-title">Keranjang Anda</h3>
      <div className="cart-order-container">
        <div className="cart-wrapper">
          <div className="item-list-wrapper">
            {cartProducts && cartProducts.length > 0 ? (
              cartProducts.map((item, index) => {
                return (
                  <ItemRow
                    product={item}
                    image={imageArray[index % 6]}
                    checkAll={checkAll}
                    checkedIdPrice={checkedIdPrice}
                    updateCheckedIdPrice={updateCheckedIdPrice}
                    cart={cartProducts}
                    updateCart={updateCartProducts}
                    index={index}
                    key={index}
                  />
                );
              })
            ) : (
              <p className="no-items-cart">No items in cart</p>
            )}
            {cartProducts && cartProducts.length > 0 ? (
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
            <p>{"Rp " + totalPrice.toLocaleString()}</p>
          </div>
        </div>
        <div className="cart-summary-wrapper">
          <h2 className="cart-summary-title">Order Summary</h2>
          <div className="cart-summary-price-wrapper">
            <p>Total product price</p>
            <p>{"Rp " + totalPrice.toLocaleString()}</p>
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
                Back to shop
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
