import Carousel, { slidesToShowPlugin } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import CarouselCard from "./ui/CarouselCard";
import CarouselCardBrand from "./ui/CarouselCardBrand";

const HomeCarousel = ({ data, color }) => {
  const cardNumbers = data.title === "by character" ? 5 : 4;

  return (
    <div className="carousel-container">
      {(data.title == "by character") | (data.title == "by brand") ? (
        <button
          className="carousel-button"
          style={{ backgroundColor: data.color }}
        >
          {data.button}
        </button>
      ) : (
        <span></span>
      )}
      <Carousel
        plugins={[
          "infinite",
          "arrows",
          {
            resolve: slidesToShowPlugin,
            options: {
              numberOfSlides: cardNumbers,
            },
          },
        ]}
      >
        {data.title === "by brand"
          ? data.sections.map((card, index) => (
              <CarouselCardBrand
                img={card.image}
                title={card.desc}
                color="green"
                key={index}
              />
            ))
          : data.sections.map((card, index) => (
              <CarouselCard
                img={card.image}
                title={card.desc}
                color={color}
                key={index}
              />
            ))}
      </Carousel>
    </div>
  );
};

export default HomeCarousel;
