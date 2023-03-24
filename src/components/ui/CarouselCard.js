const colors = {
  blue: "#4b55c0",
  green: "#149D4F",
  orange: "#fea31b",
};

const CarouselCard = ({ img, title, color }) => {
  return (
    <div
      className="carousel-card-container"
      style={{ backgroundColor: colors[color] }}
    >
      <img src={img} alt="card" />
      <h2>{title}</h2>
    </div>
  );
};
export default CarouselCard;
