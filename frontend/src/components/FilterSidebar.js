import { useState } from "react";
import "../styles/filtersidebar.css";
import PriceFilter from "./filtersidebar/PriceFilter";

const FilterSidebar = ({ categories, brands, prices, onFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);

  const capitalizeFirst = (str) => {
    const str2 = str.charAt(0).toUpperCase() + str.slice(1);
    return str2;
  };

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (selectedCategories.includes(value)) {
      setSelectedCategories(
        selectedCategories.filter((category) => category !== value)
      );
    } else {
      setSelectedCategories([...selectedCategories, value]);
    }
  };

  const handleBrandChange = (event) => {
    const value = event.target.value;
    if (selectedBrands.includes(value)) {
      setSelectedBrands(selectedBrands.filter((brand) => brand !== value));
    } else {
      setSelectedBrands([...selectedBrands, value]);
    }
  };

  const handlePriceChange = (pricerange) => {
    console.log(pricerange);
    if (selectedPrices.includes(pricerange)) {
      setSelectedPrices(selectedPrices.filter((price) => price !== pricerange));
    } else {
      setSelectedPrices([pricerange]);
      console.log("selectedPrices", selectedPrices);
    }
  };

  const handleFilterClear = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedPrices([]);
    onFilterChange({ categories: [], ages: [], brands: [], prices: [] });
  };

  const handleFilterApply = () => {
    console.log(selectedBrands, selectedPrices);
    onFilterChange({
      categories: selectedCategories,
      brands: selectedBrands,
      prices: selectedPrices,
    });
  };

  return (
    <div className="filter-sidebar">
      <h2 className="filter-title">Filter</h2>

      <div className="filter-section">
        <h3>Category</h3>
        <div className="filter-section-line" />
        <ul className="filter-list">
          {categories.map((category) => (
            <li key={category} className="filter-item">
              <label>
                <input
                  type="checkbox"
                  value={category}
                  checked={selectedCategories.includes(category)}
                  onChange={handleCategoryChange}
                />
                <span className="filter-label">
                  {capitalizeFirst(category)}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="filter-section">
        <h3>Brand</h3>
        <div className="filter-section-line" />
        <ul className="filter-list">
          {brands.map((brand) => (
            <li key={brand} className="filter-item">
              <label>
                <input
                  type="checkbox"
                  value={brand}
                  checked={selectedBrands.includes(brand)}
                  onChange={handleBrandChange}
                />
                <span className="filter-label">{capitalizeFirst(brand)}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="filter-section">
        <h3>Price</h3>
        <div className="filter-section-line" />
        <PriceFilter handleFilter={handlePriceChange} prices={prices} />
        {/* <ul className="filter-list">
          {prices.map((priceRange) => (
            <li key={priceRange} className="filter-item">
              <label>
                <input
                  type="checkbox"
                  value={priceRange}
                  checked={selectedPrices.includes(priceRange)}
                  onChange={handlePriceChange}
                />
                <span className="filter-label">${priceRange}</span>
              </label>
            </li>
          ))}
        </ul> */}
      </div>
      <button className="filter-button" onClick={handleFilterApply}>
        Filter
      </button>
      <button className="filter-button" onClick={handleFilterClear}>
        Reset
      </button>
    </div>
  );
};

export default FilterSidebar;
