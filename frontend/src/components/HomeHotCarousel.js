import Carousel, {
  slidesToShowPlugin,
  arrowsPlugin
} from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import CarouselCardHot from "./ui/CarouselCardHot";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const HomeHotCarousel = ({ data }) => {
  const cardNumbers = 4;

  return (
    <div className="hot-carousel-container">
      <button className="hot-carousel-button">
        <Link
          style={{ textDecoration: "none", color: "#4B55C0" }}
          to="products"
        >
          Browse all the toys
        </Link>
      </button>
      <Carousel
        plugins={[
          "infinite",
          {
            resolve: slidesToShowPlugin,
            options: {
              numberOfSlides: cardNumbers
            }
          },
          {
            resolve: arrowsPlugin,
            options: {
              arrowLeft: (
                <button
                  style={{
                    backgroundColor: "white",
                    height: "2.5em",
                    width: "2.5em",
                    borderRadius: "40px",
                    cursor: "pointer",
                    fontSize: "20px"
                  }}
                >
                  <FaChevronLeft />
                </button>
              ),
              arrowRight: (
                <button
                  style={{
                    backgroundColor: "white",
                    height: "2.5em",
                    width: "2.5em",
                    borderRadius: "40px",
                    cursor: "pointer",
                    fontSize: "20px"
                  }}
                >
                  <FaChevronRight />
                </button>
              ),
              addArrowClickHandler: true
            }
          }
        ]}
      >
        {data.sections.map((card, index) => (
          <CarouselCardHot img={card.image} key={index} />
        ))}
      </Carousel>
    </div>
  );
};

export default HomeHotCarousel;
