import Rating from "@mui/material/Rating";
// import { batman } from "/img";
import "../../styles/productcard.css";
const ProductCard = ({ product, image }) => {
  return (
    <div className="product-card-container">
      <img className="product-image" src={image} />
      {/* <div className="title-wrapper">
        
      </div> */}
      <h2 className="product-title">
        {product.product_name.replace(/[^\w\s]/gi, "")}
      </h2>
      <h2 className="product-price">
        {"Rp " + parseInt(product.price).toLocaleString()}
      </h2>
      <div className="brand-rating-wrapper">
        <h2 className="product-brand">
          {product.brand.replace(/[^\w\s]/gi, "")}
        </h2>
        <Rating
          name="read-only"
          value={parseFloat(product.rating)}
          precision={0.1}
          size="small"
          readOnly
        />
      </div>
    </div>
  );
};

export default ProductCard;
