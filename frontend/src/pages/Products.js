import React, { useState, useEffect } from "react";
import axios from "axios";
import FilterSidebar from "../components/FilterSidebar";
import SortDropdown from "../components/SortDropdown";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ui/ProductCard";
import { Link } from "react-router-dom";
// import { productData } from "../constants/productData";
const imageArray = [
  "/img/batman.jpg",
  "/img/barbie.jpeg",
  "/img/harrypotter.jpg",
  "/img/princess.jpg",
  "/img/batman.jpg",
  "/img/mlp.jpg",
];
function Products({
  filter = {
    categories: [],
    ages: [],
    brands: [],
    prices: [],
  },
}) {
  const apiUrl = "http://localhost:8080";

  const [productData, setProductData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState(filter);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("relevance");
  const productDataFetch = async () => {
    const response = await axios.get(`${apiUrl}/api/data/products`);
    console.log(response.data);
    setProductData(response.data[0]);
    return response.data;
  };

  useEffect(function () {
    productDataFetch();
  }, []);

  useEffect(
    function () {
      console.log(productData, "HELLO");
      setFilteredProducts(productData);
      console.log(filteredProducts);
    },
    [productData]
  );
  function handleFilterInput(filter) {
    setFilters(filter);
  }

  function handleSearchInput(query) {
    setSearchQuery(query);
  }

  function handleSortInput(query) {
    setSortOption(query);
  }

  const onSort = (option, unsortedProducts) => {
    switch (option) {
      case "price-asc":
        setFilteredProducts(
          [...filteredProducts].sort((a, b) => a.price - b.price)
        );
        break;
      case "price-desc":
        setFilteredProducts(
          [...filteredProducts].sort((a, b) => b.price - a.price)
        );
        break;
      case "rating-asc":
        setFilteredProducts(
          [...filteredProducts].sort((a, b) => a.rating - b.rating)
        );
        break;
      case "rating-desc":
        setFilteredProducts(
          [...filteredProducts].sort((a, b) => b.rating - a.rating)
        );
        break;
      default:
        setFilteredProducts(unsortedProducts);
        break;
    }
  };

  useEffect(
    function handleFilterChange() {
      let newFilteredProducts = productData;

      if (filters.categories[0]) {
        newFilteredProducts = newFilteredProducts.filter((product) =>
          filters.categories.includes(product.category)
        );
      }

      if (filters.ages[0]) {
        newFilteredProducts = newFilteredProducts.filter((product) =>
          filters.ages.includes(product.age)
        );
      }

      if (filters.brands[0]) {
        newFilteredProducts = newFilteredProducts.filter((product) =>
          filters.brands.includes(product.brand.replace(/(\r\n|\n|\r)/gm, ""))
        );
      }

      if (filters.prices[0] > 1) {
        newFilteredProducts = newFilteredProducts.filter((product) => {
          for (let priceRange of filters.prices) {
            const [min, max] = priceRange.split("-").map(parseFloat);
            if (product.price >= min && product.price <= max) {
              return true;
            }
          }
          return false;
        });
      }

      if (searchQuery.length > 0) {
        newFilteredProducts = newFilteredProducts.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setFilteredProducts(newFilteredProducts);
      onSort(sortOption, newFilteredProducts);
      console.log("after filter result after sort", newFilteredProducts);
    },
    [filters, searchQuery, sortOption, productData]
  );

  return (
    <div className="products-wrapper">
      <div className="search-sort-wrapper">
        <SearchBar onSearch={handleSearchInput} />
        <SortDropdown onSort={handleSortInput} />{" "}
      </div>

      <div className="products-page-wrapper">
        <div className="filtersidebar">
          <FilterSidebar
            categories={[
              "action figures & playsets",
              "baby, toddler, & preschool learning toys",
              "building sets & blocks",
              "dolls, collectibles, and stuffed animals",
              "games & puzzles",
              "kids arts and crafts",
              "vehicles and remote controls",
            ]}
            ages={["0-2", "3-6", "7-10", "10+"]}
            brands={[
              "lego",
              "barbie",
              "funko",
              "play-doh",
              "marvel",
              "disney",
              "hot wheels",
              "others",
            ]}
            prices={[
              "0",
              "500",
              "1000",
              "2000",
              "3000",
              "4000",
              "5000",
              "6000",
              "8000",
              "10000",
            ]}
            onFilterChange={handleFilterInput}
          />
        </div>
        <div className="products-list">
          {filteredProducts.map((product, index) => {
            return (
              <Link
                to="/products/product-detail"
                replace={true}
                style={{ textDecoration: "none" }}
                state={product}
                key={index}
              >
                <ProductCard
                  product={product}
                  image={imageArray[index % 6]}
                  key={product.product_id}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Products;
