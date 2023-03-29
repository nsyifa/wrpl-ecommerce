import Rating from "@mui/material/Rating";
// import { batman } from "/img";
import "../../styles/productcard.css";
const ProductCard = ({ product, image }) => {
  return (
    <div className="product-card-container">
      <img className="product-image" src={image} />
      {/* <div className="title-wrapper">
        
      </div> */}
      <h2 className="product-title">{product.name}</h2>
      <div className="price-rating-wrapper">
        <h2 className="product-price">
          {"$" + parseFloat(product.price).toFixed(2)}
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
