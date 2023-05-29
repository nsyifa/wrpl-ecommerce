import Carousel, {
  slidesToShowPlugin,
  arrowsPlugin,
} from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import CarouselCardHot from "./ui/CarouselCardHot";
import { Link } from "react-router-dom";
import { FaBorderNone, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const HomeTrendingCarousel = ({ data, user, col = 2 }) => {
  const cardNumbers = 4;

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
        {col === 2
          ? Array.from({ length: Math.ceil(data.length / 2) }).map(
              (_, index) => {
                const product = data[index * 2];
                const nextProduct = data[index * 2 + 1];

                return (
                  <div
                    className="carousel-card-hot-column"
                    key={product?.product_id || index}
                  >
                    {product && (
                      <CarouselCardHot user={user} product={product} />
                    )}
                    {nextProduct && (
                      <CarouselCardHot user={user} product={nextProduct} />
                    )}
                  </div>
                );
              }
            )
          : data.map((product, index) => (
              <div
                className="carousel-card-hot-column"
                key={product.product_id}
              >
                <CarouselCardHot user={user} product={product} />
              </div>
            ))}
      </Carousel>
    </div>
  );
};

export default HomeTrendingCarousel;
