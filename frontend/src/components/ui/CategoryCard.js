import React from "react";

const CategoryCard = ({ category, img }) => {
  return (
    <div className="category-card">
      <h2>{category}</h2>
      <img className="category-image" src={img} />
    </div>
  );
};

export default CategoryCard;
