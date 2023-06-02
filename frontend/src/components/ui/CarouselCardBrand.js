import { Link } from "react-router-dom";

const CarouselCardBrand = ({img, url}) => {
  return (
    <div className="carousel-card-brand-container">
      <Link to = {url}>
        <img src={img} alt="card" />
      </Link>
    </div>
  );
};

export default CarouselCardBrand;
