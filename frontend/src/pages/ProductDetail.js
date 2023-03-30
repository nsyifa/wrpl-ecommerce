import React, { useState, useRef } from "react";
import Rating from "@mui/material/Rating";
import { useLocation, Link } from "react-router-dom";
import ProductImageGallery from "../components/ProductImageGallery";
import Quantity from "../components/productdetail/Quantity";
import ReviewsRatings from "../components/productdetail/ReviewsRatings";
import { addCartQuantity } from "../services/cart";
import "../styles/productdetail.css";

const ProductDetail = ({ user }) => {
  //   const location = useLocation();
  const { state } = useLocation();
  const product = state;
  console.log(product);
  const [quantity, setQuantity] = useState(1);
  const randomSales = useRef(Math.floor(Math.random() * 500));
  const randomRatings = useRef(Math.floor(Math.random() * randomSales.current));

  function updateQuantity(newQuantity) {
    setQuantity(newQuantity);
  }

  async function handleAddCart(addQuantity) {
    const res = await addCartQuantity(
      user.cust_id,
      product.product_id,
      addQuantity
    );
    window.alert("Added to cart!");
  }

  return (
    <div className="product-detail-wrapper">
      <div className="product-image-desc">
        <div className="pd-left-col">
          <div className="image-gallery-wrapper">
            <ProductImageGallery />
          </div>
          <div className="quantity-cart-wrapper">
            {" "}
            <Quantity
              quantity={quantity}
              stock={product.stock}
              updateQuantity={updateQuantity}
            />
            {user.cust_name ? (
              <button
                className="pd-cart-button"
                onClick={() => handleAddCart(quantity)}
              >
                <img src="/icons/pd-cart.svg" />
                Add to Cart
              </button>
            ) : (
              <Link
                style={{ textDecoration: "none" }}
                replace={true}
                to="/login"
              >
                <button className="pd-cart-button">
                  <img src="/icons/pd-cart.svg" />
                  Add to Cart
                </button>
              </Link>
            )}
            {/* <button className="pd-cart-button">
              <img src="/icons/pd-cart.svg" />
              Add to Cart
            </button> */}
            <button className="pd-buy-button">Buy Now</button>
          </div>
        </div>

        <div className="pd-right-col">
          <p className="pd-brand">{product.brand}</p>
          <p className="pd-title">{product.name}</p>
          <div className="rating-sales-wrapper">
            <Rating
              name="read-only"
              value={parseFloat(product.rating)}
              precision={0.1}
              size="medium"
              readOnly
            />
            <p>|</p>
            <p>
              <b>{randomSales.current}</b> people bought this
            </p>
          </div>
          <div className="price-share-wrapper">
            <p>{"$" + parseFloat(product.price).toFixed(2)}</p>
            <img src="/icons/pd-share.svg" />
            <img src="/icons/pd-like.svg" />
          </div>

          <hr />
          <p className="description-heading">Description</p>
          <p className="pd-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <ul className="pd-description-list">
            <li>
              Arcu cursus vitae congue mauris rhoncus aenean vel elit
              scelerisque.
            </li>
            <li>
              Accumsan sit amet nulla facilisi morbi tempus iaculis urna id.
            </li>
            <li>Dui sapien eget mi proin sed libero enim sed faucibus.</li>
            <li>Facilisis gravida neque convallis a cras semper auctor.</li>
            <li>
              Justo eget magna fermentum iaculis eu non. Nisi lacus sed viverra
              tellus in.
            </li>
          </ul>
        </div>
      </div>
      <ReviewsRatings
        rating={product.rating}
        ratingamount={randomRatings.current}
      />
    </div>
  );
};

export default ProductDetail;
