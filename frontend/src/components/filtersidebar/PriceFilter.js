import React, { useState, useEffect } from "react";
import "../../styles/pricefilter.css";

const PriceFilter = ({ handleFilter, prices }) => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  useEffect(
    function () {
      const priceString = `${minPrice}-${maxPrice}`;
      handleFilter(priceString);
    },
    [minPrice, maxPrice]
  );

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   handleFilter(minPrice, maxPrice);
  // };

  return (
    <form className="price-dropdown">
      <label htmlFor="minPrice">Minimum Price:</label>
      <select id="minPrice" value={minPrice} onChange={handleMinPriceChange}>
        <option value="">--Select--</option>
        {prices.map((price, index) => {
          return (
            <option value={price} key={index}>
              {"Rp " + parseInt(price).toLocaleString()}
            </option>
          );
        })}
      </select>
      <label htmlFor="maxPrice">Maximum Price:</label>
      <select id="maxPrice" value={maxPrice} onChange={handleMaxPriceChange}>
        <option value="">--Select--</option>
        {prices.map((price, index) => {
          return (
            <option value={price} key={index}>
              {"Rp " + parseInt(price).toLocaleString()}
            </option>
          );
        })}
        {/* Add more options as needed */}
      </select>
    </form>
  );
};

export default PriceFilter;
