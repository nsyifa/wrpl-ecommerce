import HomeCarousel from "../components/HomeCarousel";
import { useEffect } from "react";
import HomeHotCarousel from "../components/HomeHotCarousel";
import { carouselData } from "../constants/carouselData.js";

const Home = ({ user }) => {
  // KODE DIBAWAH CUMA BUAT TESTING MIDTRANS PAYMENT GATEWAY
  // useEffect(() => {
  //   // You can also change below url value to any script url you wish to load,
  //   // for example this is snap.js for Sandbox Env (Note: remove `.sandbox` from url if you want to use production version)
  //   const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";

  //   let scriptTag = document.createElement("script");
  //   scriptTag.src = midtransScriptUrl;

  //   // Optional: set script attribute, for example snap.js have data-client-key attribute
  //   // (change the value according to your client-key)
  //   const myMidtransClientKey = "your-client-key-goes-here";
  //   scriptTag.setAttribute("data-client-key", myMidtransClientKey);

  //   document.body.appendChild(scriptTag);

  //   return () => {
  //     document.body.removeChild(scriptTag);
  //   };
  // }, []);

  // Then somewhere else on your React component, `window.snap` global object will be available to use
  // e.g. you can then call `window.snap.pay( ... )` function.
  return (
    <div className="home-container">
      <div className="banner">
        <div className="banner-text">
          <h2>Upgrade your style at unbelievable prices. Don't miss out!</h2>
          <button className="banner-button">Buy Now</button>
        </div>
        <img
          className="banner-woman-img"
          src="/img/landing-page-reverie/banner-woman.png"
          alt="banner-woman"
        />
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
          {/* <button
            onClick={() =>
              window.snap.pay("c5142b4e-207e-4cff-b782-dc468c9ffc42")
            }
          >
            Pay
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
