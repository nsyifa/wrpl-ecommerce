import React, { useState } from "react";
import "../styles/sortdropdown.css";

const SortDropdown = ({ products, onSort }) => {
  const [sortOption, setSortOption] = useState("relevance");

  const handleSortChange = (e) => {
    const option = e.target.value;
    setSortOption(option);
    onSort(option);
    console.log(option);
  };
  return (
    <div className="sort-dropdown">
      <label htmlFor="sort-select">Sort By:</label>
      <select id="sort-select" value={sortOption} onChange={handleSortChange}>
        <option value="relevance">Relevance</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating-desc">Rating: High to Low</option>
        <option value="rating-asc">Rating: Low to High</option>
      </select>
    </div>
  );
};

export default SortDropdown;
