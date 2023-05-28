import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/searchbar.css";

function HeaderSearchBar(props) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/products", {
      state: {
        searchQuery: query,
      },
    });
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        className="search-input"
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
      />
      <button className="search-button" type="submit">
        <img src="/img/ecommerce/search.svg" />
      </button>
    </form>
  );
}

export default HeaderSearchBar;
