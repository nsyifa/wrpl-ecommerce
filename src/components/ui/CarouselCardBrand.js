const CarouselCardBrand = ({ img, title }) => {
  return (
    <div className="carousel-card-brand-container">
      <img src={img} alt="card" />
      <h2>{title}</h2>
    </div>
  );
};

export default CarouselCardBrand;
