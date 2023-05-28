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
    brands: [],
    prices: [],
  },
}) {
  const non_other_brands = [
    "FRESH",
    "LA MER",
    "DRUNK ELEPHANT",
    "LANEIGE",
    "SUNDAY RILEY",
    "TATCHA",
    "SK-II",
    "BDK Parfums",
    "Vilhelm Parfumerie",
    "Rook Perfumes",
    "PRIN",
    "PARX",
    "SPYKAR",
    "SEJ by Nisha Gupta",
    "PARFAIT",
    "Gini and Jony",
  ];
  const apiUrlEffe = "http://localhost:8082";
  const apiUrlLumiere = "http://localhost:8083";
  const apiUrlZalya = "http://localhost:8084";

  const [productData, setProductData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState(filter);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("relevance");
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

      if (filters.brands[0]) {
        const after_cat_before_brand = [...newFilteredProducts];
        newFilteredProducts = newFilteredProducts.filter((product) =>
          filters.brands.includes(product.brand.replace(/(\r\n|\n|\r)/gm, ""))
        );
        if (filters.brands.includes("others")) {
          newFilteredProducts = newFilteredProducts.concat(
            after_cat_before_brand.filter(
              (product) =>
                !non_other_brands.includes(
                  product.brand.replace(/(\r\n|\n|\r)/gm, "")
                )
            )
          );
        }
      }

      if (filters.prices[0]?.length > 1) {
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
          product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
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
            categories={["perfume", "cosmetic", "clothing"]}
            brands={[
              "FRESH",
              "LA MER",
              "DRUNK ELEPHANT",
              "LANEIGE",
              "SUNDAY RILEY",
              "TATCHA",
              "SK-II",
              "BDK Parfums",
              "Vilhelm Parfumerie",
              "Rook Perfumes",
              "PRIN",
              "PARX",
              "SPYKAR",
              "SEJ by Nisha Gupta",
              "PARFAIT",
              "Gini and Jony",
              "others",
            ]}
            prices={[
              "0",
              "50000",
              "100000",
              "150000",
              "200000",
              "250000",
              "300000",
              "400000",
              "500000",
              "600000",
            ]}
            onFilterChange={handleFilterInput}
          />
        </div>
        <div className="products-list">
          {filteredProducts.map((product, index) => {
            return (
              <Link
                to="/products/product-detail"
                replace={false}
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
