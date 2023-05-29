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
                ages: [],
                brands: [],
                prices: [],
              }}
            />
          }
        />
        <Route
          path="products/dolls-collectibles-stuffed-animals"
          element={
            <Products
              filter={{
                categories: ["dolls, collectibles, and stuffed animals"],
                ages: [],
                brands: [],
                prices: [],
              }}
            />
          }
        />
        <Route
          path="products/games-puzzles"
          element={
            <Products
              filter={{
                categories: ["games & puzzles"],
                ages: [],
                brands: [],
                prices: [],
              }}
            />
          }
        />
        <Route
          path="products/kids-arts-crafts"
          element={
            <Products
              filter={{
                categories: ["kids arts and crafts"],
                ages: [],
                brands: [],
                prices: [],
              }}
            />
          }
        />
        <Route
          path="products/vehicles-remote-controls"
          element={
            <Products
              filter={{
                categories: ["vehicles and remote controls"],
                ages: [],
                brands: [],
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
