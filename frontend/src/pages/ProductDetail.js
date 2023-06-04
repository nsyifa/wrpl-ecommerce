import React, { useState, useRef, useEffect } from "react";
import Rating from "@mui/material/Rating";
import { useLocation, Link, useNavigate } from "react-router-dom";
import ProductImageGallery from "../components/ProductImageGallery";
import Quantity from "../components/productdetail/Quantity";
import ReviewsRatings from "../components/productdetail/ReviewsRatings";
import { addCartQuantity } from "../services/cart";
import "../styles/productdetail.css";

const ProductDetail = ({ user }) => {
  //   const location = useLocation();
  const navigate = useNavigate();
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

  function handleBuyNow() {
    navigate("/checkout", {
      state: [
        {
          product_id: product.product_id,
          product_name: product.product_name,
          category: product.category,
          brand: product.brand,
          weight: product.weight,
          quantity: quantity,
          price: parseFloat(product.price * quantity),
          unit_price: product.price,
        },
      ],
    });
  }

  const objectRef = useRef(null);
  useEffect(() => {
    const objectElement = objectRef.current;
    const objectPosition = objectElement.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const objectHeight = objectPosition.height;

    const scrollToPosition = objectPosition.top - 50;

    window.scrollTo({
      top: scrollToPosition,
      behavior: "smooth",
    });
  }, []);

  console.log(product.product_id);
  return (
    <div className="product-detail-wrapper" ref={objectRef}>
      <div className="product-image-desc">
        <div className="pd-left-col">
          <div className="image-gallery-wrapper">
            <ProductImageGallery />
          </div>
        </div>

        <div className="pd-right-col">
          <p className="pd-brand">{product.brand.replace(/[^\w\s]/gi, "")}</p>
          <p className="pd-title">
            {product.product_name.replace(/[^\w\s]/gi, "")}
          </p>
          <div className="rating-sales-wrapper">
            <Rating
              name="read-only"
              value={parseFloat(product.rating)}
              precision={0.1}
              size="medium"
              readOnly
              sx={{ color: "#CE7777" }}
            />
            <p>|</p>
            <p>
              <b>{randomSales.current}</b> terjual
            </p>
          </div>
          <div className="price-share-wrapper">
            <p>{"Rp " + parseInt(product.price).toLocaleString()}</p>
            <img src="/icons/pd-share.svg" />
            <img src="/icons/pd-like.svg" />
          </div>

          <hr></hr>
          <div className="variance-wrapper">
            <p className="variance-title">Variansi</p>
            <div className="variance-size-wrapper">
              <p>Ukuran</p>
              <button className="variance-btn">15ml</button>
              <button className="variance-btn">30ml</button>
              <button className="variance-btn">50ml</button>
            </div>
          </div>
          <div className="quantity-cart-wrapper">
            {" "}
            <Quantity
              quantity={quantity}
              stock={product.stock}
              updateQuantity={updateQuantity}
            />
            <div className="chat-cart-buy-wrapper">
              <button className="pd-chat-button">
                <img src="/img/ecommerce/chat.svg" />
                Chat
              </button>
              {user.cust_id ? (
                <div>
                  <button
                    className="pd-cart-button"
                    onClick={() => handleAddCart(quantity)}
                  >
                    <img src="/img/ecommerce/icon-cart-btn.svg" />
                    Tambahkan ke keranjang
                  </button>
                </div>
              ) : (
                <Link
                  style={{ textDecoration: "none" }}
                  replace={true}
                  to="/login"
                >
                  <button className="pd-cart-button">
                    <img src="/img/ecommerce/icon-cart-btn.svg" />
                    Tambahkan ke keranjang
                  </button>
                </Link>
              )}
              {user.cust_id ? (
                <button
                  className="pd-buy-button"
                  onClick={() => handleBuyNow()}
                >
                  Beli sekarang
                </button>
              ) : (
                <Link
                  style={{ textDecoration: "none" }}
                  replace={true}
                  to="/login"
                >
                  <button className="pd-buy-button">Beli sekarang</button>
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="pd-bottom-row">
          <hr />
          <p className="description-heading">Description</p>
          <p className="pd-description">
            {product.description.replace(/[^\w\s]/gi, "")}
          </p>

          <div className="pd-seller-container">
            {product.product_id.startsWith("P") ? (
              <img src="/img/ecommerce/effe.svg" />
            ) : product.product_id.startsWith("F") ? (
              <img src="/img/ecommerce/zalya.svg" />
            ) : (
              <img src="/img/ecommerce/lumiere.svg" />
            )}

            <div className="pd-seller">
              <p className="seller-name">
                {product.product_id.startsWith("P")
                  ? "EFFE"
                  : product.product_id.startsWith("F")
                  ? "ZALYA"
                  : "LUMIERE"}
              </p>

              <p>Aktif 15 menit yang lalu</p>
              <button className="pd-seller-btn">Kunjungi toko</button>
            </div>

            <div className="pd-seller-information">
              <div className="pd-seller-col rating">
                <div className="col-top">
                  <img src="/img/ecommerce/star.svg" />
                  <p>4.8</p>
                </div>
                <p className="col-bottom">Penilaian</p>
              </div>

              <div className="pd-seller-col count">
                <div className="col-top">
                  <img src="/img/ecommerce/bag.svg" />
                  <p>100</p>
                </div>
                <p className="col-bottom">Jumlah Produk</p>
              </div>

              <div className="pd-seller-col chat">
                <div className="col-top">
                  <img src="/img/ecommerce/seller-chat.svg" />
                  <p>97%</p>
                </div>
                <p className="col-bottom">Performa Chat</p>
              </div>

              <div className="pd-seller-col operasional">
                <div className="col-top">
                  <img src="/img/ecommerce/toko.svg" />
                  <p>24 JAM</p>
                </div>
                <p className="col-bottom">Jam Operasional Toko</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ReviewsRatings
        rating={parseFloat(product.rating)}
        ratingamount={randomRatings.current}
      />
    </div>
  );
};

export default ProductDetail;
