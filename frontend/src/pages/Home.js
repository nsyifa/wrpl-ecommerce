import HomeCarousel from "../components/HomeCarousel";
import HomeHotCarousel from "../components/HomeHotCarousel";
import { carouselData } from "../constants/carouselData.js";

const Home = ({ user }) => {
  return (
    <div className = "home-container">
      <div className="banner">
        <img className="kids-img" src="/img/landing-page/kids.png" />
        <div className="banner-text">
          <h2>For kids, by kids</h2>
          <p> Welcome to 4Kiddos, where playtime never ends! </p>
          {user.cust_name ? (
            <p> {"Welcome to 4Kiddos, " + user.cust_name + "!"}</p>
          ) : (
            ""
          )}
          <p>
            We offer a wide range of toys and games that are perfect for kids of
            all ages.
          </p>
          <p> Shop with us today and discover the joy of play!</p>
        </div>
        <img
          className="toy-story-img"
          src="/img/landing-page/toy-story.png"
          alt="toystory"
        />
      </div>

      <div className="wave-img">
        <img className="wave1" src="/img/landing-page/Intersect.png" />
      </div>

      <div className="hottest-products">
        <div className="hottest-products-text">
          <h2>See some of our hottest products</h2>
          <img className="circle" src="/img/landing-page/circle.png" />
          <p>The hottest toys that every kids would love to buy!</p>
        </div>
        <div className="hottest-products-carousel">
          <HomeHotCarousel data={carouselData[1]} />
        </div>
      </div>

      <div className="wave-img">
        <img className="wave2" src="/img/landing-page/Intersect (1).png" />
        <img
          className="ways-text-bg"
          src="../img/landing-page/Rectangle 10.png"
        />
      </div>

      <div className="ways-to-shop">
        <div className="ways-text">
          <h2>Shop as you like</h2>
        </div>
        <div className="based-on-age text">
          <img src="/img/landing-page/Doodle stars.png" className="hiasan" />
          <span>Based on age</span>
          <img src="/img/landing-page/Doodle stars.png" className="hiasan" />
        </div>
        <HomeCarousel data={carouselData[0]} color="blue" />
        <div style={{ marginTop: "20px" }}>
          <div className="based-on-category text">
            <img src="/img/landing-page/Doodle stars.png" className="hiasan" />
            <span>Based on category</span>
            <img src="/img/landing-page/Doodle stars.png" className="hiasan" />
          </div>
          <HomeCarousel data={carouselData[1]} color="orange" />
        </div>
        <div style={{ marginTop: "40px" }}>
          <div className="based-on-brand text">
            <img src="/img/landing-page/Doodle stars.png" className="hiasan" />
            <span>Based on brand</span>
            <img src="/img/landing-page/Doodle stars.png" className="hiasan" />
          </div>
          <HomeCarousel data={carouselData[2]} color="green" />
        </div>
      </div>
    </div>
  );
};

export default Home;
