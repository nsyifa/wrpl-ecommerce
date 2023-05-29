import Carousel, {
  slidesToShowPlugin,
  arrowsPlugin,
} from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import CarouselCardBrand from "./ui/CarouselCardBrand";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const HomeCarousel = ({ data }) => {
  const cardNumbers = 5;

  return (
    <div className="hot-carousel-container">
      <Carousel
        plugins={[
          "infinite",
          {
            resolve: slidesToShowPlugin,
            options: {
              numberOfSlides: cardNumbers,
            },
          },
          {
            resolve: arrowsPlugin,
            options: {
              arrowLeft: (
                <button
                  style={{
                    height: "2.5em",
                    width: "2.5em",
                    cursor: "pointer",
                    border: "none",
                    fontSize: "20px",
                  }}
                >
                  <FaChevronLeft />
                </button>
              ),
              arrowRight: (
                <button
                  style={{
                    height: "2.5em",
                    width: "2.5em",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "20px",
                  }}
                >
                  <FaChevronRight />
                </button>
              ),
              addArrowClickHandler: true,
            },
          },
        ]}
      >
        {data.sections.map((card, index) => (
          <CarouselCardBrand img={card.image} key={index} />
        ))}
      </Carousel>
    </div>
  );
};

export default HomeCarousel;
