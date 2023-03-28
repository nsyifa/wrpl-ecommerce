import React from "react";
import "../styles/productimagegallery.css";
import ImageGallery from "react-image-gallery";

const images = [
  {
    original: "/img/product-detail-sample/1.jpg",
    thumbnail: "/img/product-detail-sample/1.jpg",
  },
  {
    original: "/img/product-detail-sample/2.jpg",
    thumbnail: "/img/product-detail-sample/2.jpg",
  },
  {
    original: "/img/product-detail-sample/3.jpg",
    thumbnail: "/img/product-detail-sample/3.jpg",
  },
  {
    original: "/img/product-detail-sample/4.jpg",
    thumbnail: "/img/product-detail-sample/4.jpg",
  },
  {
    original: "/img/product-detail-sample/5.jpg",
    thumbnail: "/img/product-detail-sample/5.jpg",
  },
  {
    original: "/img/product-detail-sample/6.jpg",
    thumbnail: "/img/product-detail-sample/6.jpg",
  },
  {
    original: "/img/product-detail-sample/7.jpg",
    thumbnail: "/img/product-detail-sample/7.jpg",
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
