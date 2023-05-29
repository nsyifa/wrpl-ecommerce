import Rating from "@mui/material/Rating";
import { addCartQuantity } from "../../services/cart";
import { Link } from "react-router-dom";
const CarouselCardHot = ({ product, user }) => {
  const capitalizeFirst = (str) => {
    const str2 = str.charAt(0).toUpperCase() + str.slice(1);
    return str2;
  };

  async function handleAddCart(addQuantity) {
    const res = await addCartQuantity(
      user.cust_id,
      product.product_id,
      addQuantity
    );
    window.alert("Added to cart!");
  }

  return (
    <div className="carousel-card-hot-container">
      <div className="img-container">
        <img
          src="/img/landing-page-reverie/carousel-placeholder.png"
          alt="card"
        />
        <div className="carousel-card-product-info">
          <div className="card-info-col1">
            <Link
              to="/products/product-detail"
              replace={false}
              style={{ textDecoration: "none", color: "inherit" }}
              state={product}
            >
              <h2>{product.product_name.replace(/[^\w\s]/gi, "")}</h2>
            </Link>
            <p>{capitalizeFirst(product.category)}</p>
            <Rating
              name="read-only"
              value={parseFloat(product.rating)}
              precision={0.1}
              size="small"
              sx={{
                "& .MuiRating-iconFilled": {
                  color: "#CE7777",
                },
              }}
              readOnly
            />
          </div>
          <div className="card-info-col2">
            <h2>{"Rp" + parseInt(product.price).toLocaleString()}</h2>
          </div>
        </div>
        {user.cust_id ? (
          <button
            className="carousel-card-button"
            onClick={() => handleAddCart(1)}
          >
            Add to Cart
          </button>
        ) : (
          <Link style={{ textDecoration: "none" }} replace={true} to="/login">
            <button className="carousel-card-button">Add to Cart</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CarouselCardHot;
