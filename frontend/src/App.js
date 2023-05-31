import { useEffect, useState } from "react";
import Home from "./pages/Home";
// import Test from "./pages/Test";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import { Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      console.log(loggedInUser);
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  useEffect(() => {
    console.log("User updated", user);
  }, [user]);

  const updateUser = (customer) => {
    setUser(customer);
  };

  return (
    <Routes>
      <Route path="/" element={<Layout user={user} updateUser={updateUser} />}>
        <Route index element={<Home user={user} />} />
        <Route path="about" element={<About />} />
        <Route path="register" element={<Register />} />
        {/* <Route path="login" element={<Login updateUser={updateUser} />} /> */}
        <Route
          path="/login"
          element={
            user.cust_id ? (
              <Navigate to="/" />
            ) : (
              <Login updateUser={updateUser} />
            )
          }
        />
        <Route path="cart" element={<Cart user={user} />} />
        <Route path="checkout" element={<Checkout user={user} />} />
        <Route path="payment" element={<Payment user={user} />} />
        <Route path="products" element={<Products />} />
        <Route
          path="/products/product-detail"
          element={<ProductDetail user={user} />}
        />
        {/* <Route path="test" element={<Test />} /> */}
        <Route
          path="products/perfume"
          element={
            <Products
              filter={{
                categories: ["perfume"],
                brands: [],
                prices: [],
              }}
            />
          }
        />
        <Route
          path="products/cosmetic"
          element={
            <Products
              filter={{
                categories: ["cosmetic"],
                brands: [],
                prices: [],
              }}
            />
          }
        />
        <Route
          path="products/clothing"
          element={
            <Products
              filter={{
                categories: ["clothing"],
                brands: [],
                prices: [],
              }}
            />
          }
        />
        <Route
          path="products/fresh"
          element={
            <Products
              filter={{
                categories: [],
                brands: ["FRESH"],
                prices: [],
              }}
            />
          }
        />
        <Route
          path="products/la-mer"
          element={
            <Products
              filter={{
                categories: [],
                brands: ["LA MER"],
                prices: [],
              }}
            />
          }
        />
        <Route
          path="products/drunk-elephant"
          element={
            <Products
              filter={{
                categories: [],
                brands: ["DRUNK ELEPHANT"],
                prices: [],
              }}
            />
          }
        />
        <Route
          path="products/laneige"
          element={
            <Products
              filter={{
                categories: [],
                brands: ["LANEIGE"],
                prices: [],
              }}
            />
          }
        />
        <Route
          path="products/sunday-riley"
          element={
            <Products
              filter={{
                categories: [],
                brands: ["SUNDAY RILEY"],
                prices: [],
              }}
            />
          }
        />
        <Route
          path="products/tatcha"
          element={
            <Products
              filter={{
                categories: [],
                brands: ["TATCHA"],
                prices: [],
              }}
            />
          }
        />
        <Route
          path="products/sk-ii"
          element={
            <Products
              filter={{
                categories: [],
                brands: ["SK-II"],
                prices: [],
              }}
            />
          }
        />
        <Route
          path="products/bdk-parfums"
          element={
            <Products
              filter={{
                categories: [],
                brands: ["BDK Parfums"],
                prices: [],
              }}
            />
          }
        />
        <Route
          path="products/vilhelm-parfumerie"
          element={
            <Products
              filter={{
                categories: [],
                brands: ["Vilhelm Parfumerie"],
                prices: [],
              }}
            />
          }
        />
        <Route
          path="products/rook-perfumes"
          element={
            <Products
              filter={{
                categories: [],
                brands: ["Rook Perfumes"],
                prices: [],
              }}
            />
          }
        />
        <Route
          path="products/prin"
          element={
            <Products
              filter={{
                categories: [],
                brands: ["PRIN"],
                prices: [],
              }}
            />
          }
        />
        <Route
          path="products/parx"
          element={
            <Products
              filter={{
                categories: [],
                brands: ["PARX"],
                prices: [],
              }}
            />
          }
        />
        <Route
          path="products/spykar"
          element={
            <Products
              filter={{
                categories: [],
                brands: ["SPYKAR"],
                prices: [],
              }}
            />
          }
        />
        <Route
          path="products/sej"
          element={
            <Products
              filter={{
                categories: [],
                brands: ["SEJ by Nisha Gupta"],
                prices: [],
              }}
            />
          }
        />
        <Route
          path="products/parfait"
          element={
            <Products
              filter={{
                categories: [],
                brands: ["PARFAIT"],
                prices: [],
              }}
            />
          }
        />
        <Route
          path="products/gini-and-jony"
          element={
            <Products
              filter={{
                categories: [],
                brands: ["Gini and Jony"],
                prices: [],
              }}
            />
          }
        />
        <Route
          path="products/others"
          element={
            <Products
              filter={{
                categories: [],
                brands: ["others"],
                prices: [],
              }}
            />
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
