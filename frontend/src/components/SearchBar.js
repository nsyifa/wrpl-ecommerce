import React, { useState } from "react";
import "../styles/searchbar.css";

function SearchBar(props) {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSearch(query);
    console.log(query);
  };

  return (
    <form className="search-form-product" onSubmit={handleSubmit}>
      <input
        className="search-input-product"
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
      />
      <button className="search-button" type="submit">
        <img src="/img/ecommerce/search-black.svg"/>
      </button>
    </form>
  );
}

export default SearchBar;
