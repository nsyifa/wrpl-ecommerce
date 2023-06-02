import React from "react";
import "../styles/productimagegallery.css";
import ImageGallery from "react-image-gallery";

const images = [
  {
    original: "/img/ecommerce/product-detail-sample/1.jpg",
    thumbnail: "/img/ecommerce/product-detail-sample/1.jpg",
  },
  {
    original: "/img/ecommerce/product-detail-sample/2.jpeg",
    thumbnail: "/img/ecommerce/product-detail-sample/2.jpeg",
  },
  {
    original: "/img/ecommerce/product-detail-sample/3.jpeg",
    thumbnail: "/img/ecommerce/product-detail-sample/3.jpeg",
  },
];

const ProductImageGallery = () => {
  return (
    <div>
      <ImageGallery items={images} />
    </div>
  );
};

export default ProductImageGallery;
