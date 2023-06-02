import HomeCarousel from "../components/HomeCarousel";
import { useEffect, useState } from "react";
import axios from "axios";
import HomeHotCarousel from "../components/HomeHotCarousel";
import { Link } from "react-router-dom";
import { carouselData } from "../constants/carouselData.js";
import HomeTrendingCarousel from "../components/HomeTrendingCarousel";
import CategoryCard from "../components/ui/CategoryCard";

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

  const apiUrlEffe = "http://localhost:8082";
  const apiUrlLumiere = "http://localhost:8083";
  const apiUrlZalya = "http://localhost:8084";

  const [productData, setProductData] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [newArrival, setNewArrival] = useState([]);
  const [youMightLike, setYouMightLike] = useState([]);

  const productDataFetch = async () => {
    const response_effe = await axios.get(`${apiUrlEffe}/api/effe/products`);
    const response_lumiere = await axios.get(
      `${apiUrlLumiere}/api/lumiere/products`
    );
    const response_zalya = await axios.get(`${apiUrlZalya}/api/zalya/products`);
    console.log(response_effe.data);
    const response_data = response_effe.data.concat(
      response_lumiere.data,
      response_zalya.data
    );
    console.log(response_data);
    setProductData(response_data);
    return response_data;
  };

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  useEffect(function () {
    productDataFetch();
  }, []);

  useEffect(
    function () {
      if (productData) {
        const shuffledProducts = shuffleArray(productData);
        setTrendingProducts(shuffledProducts.slice(0, 24));
        setNewArrival(shuffledProducts.slice(24, 48));
        setYouMightLike(shuffledProducts.slice(48, 60));
      }
    },
    [productData]
  );
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="home-container">
      <div className="banner">
        <div className="banner-text">
          <h2>Upgrade your style at unbelievable prices. Don't miss out!</h2>
          <Link
            to="/products"
            replace={false}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <button className="banner-button">Buy Now</button>
          </Link>
        </div>
        <img
          className="banner-woman-img"
          src="/img/landing-page-reverie/banner-woman.png"
          alt="banner-woman"
        />
      </div>

      <div className="hottest-products">
        <h2 className="hottest-products-text">Trending Now!</h2>
        <div className="hottest-products-carousel">
          {productData ? (
            <HomeTrendingCarousel user={user} data={trendingProducts} />
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="based-on-category">
        <h2 className="hottest-products-text">Based on Categories</h2>
        <div className="category-cards-container">
          <Link
            to="/products/fashion"
            replace={false}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <CategoryCard
              category="Fashion"
              img="/img/landing-page-reverie/category-fashion.jpg"
            />
          </Link>
          <Link
            to="/products/perfume"
            replace={false}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <CategoryCard
              category="Perfume"
              img="/img/landing-page-reverie/category-perfume.jpg"
            />
          </Link>
          <Link
            to="/products/cosmetics"
            replace={false}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <CategoryCard
              category="Cosmetics"
              img="/img/landing-page-reverie/category-cosmetics.jpg"
            />
          </Link>
        </div>
      </div>
      <div className="hottest-products">
        <h2 className="hottest-products-text">New Arrivals</h2>
        <div className="hottest-products-carousel">
          {productData ? (
            <HomeTrendingCarousel user={user} data={newArrival} />
          ) : (
            ""
          )}
        </div>
      </div>
      <div
        className="hottest-products"
        style={{ height: "200px", marginTop: "8em" }}
      >
        <h2 className="hottest-products-text">Choose Your Brand</h2>
        {productData ? <HomeCarousel data={carouselData[2]} /> : ""}
      </div>
      <div
        className="hottest-products"
        style={{ height: "507px", marginTop: "8em" }}
      >
        <h2 className="hottest-products-text">You Might Like</h2>
        <div className="hottest-products-carousel">
          {productData ? (
            <HomeTrendingCarousel user={user} data={youMightLike} col={1} />
          ) : (
            ""
          )}
        </div>
      </div>
      {/* <button
            onClick={() =>
              window.snap.pay("c5142b4e-207e-4cff-b782-dc468c9ffc42")
            }
          >
            Pay
          </button> */}
    </div>
  );
};

export default Home;
