import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="products" element={<Products />} />

        <Route
          path="products/0-2years"
          element={
            <Products
              filter={{
                categories: [],
                ages: ["0-2"],
                brands: [],
                prices: []
              }}
            />
          }
        />
        <Route
          path="products/3-6years"
          element={
            <Products
              filter={{
                categories: [],
                ages: ["3-6"],
                brands: [],
                prices: []
              }}
            />
          }
        />
        <Route
          path="products/7-10years"
          element={
            <Products
              filter={{
                categories: [],
                ages: ["7-10"],
                brands: [],
                prices: []
              }}
            />
          }
        />
        <Route
          path="products/10years"
          element={
            <Products
              filter={{
                categories: [],
                ages: ["10+"],
                brands: [],
                prices: []
              }}
            />
          }
        />

        <Route
          path="products/action-figures-playsets"
          element={
            <Products
              filter={{
                categories: ["action figures & playsets"],
                ages: [],
                brands: [],
                prices: []
              }}
            />
          }
        />
        <Route
          path="products/baby-toddler-preschool"
          element={
            <Products
              filter={{
                categories: ["baby, toddler, & preschool learning toys"],
                ages: [],
                brands: [],
                prices: []
              }}
            />
          }
        />
        <Route
          path="products/building-sets-blocks"
          element={
            <Products
              filter={{
                categories: ["building sets & blocks"],
                ages: [],
                brands: [],
                prices: []
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
                prices: []
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
                prices: []
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
                prices: []
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
                prices: []
              }}
            />
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
