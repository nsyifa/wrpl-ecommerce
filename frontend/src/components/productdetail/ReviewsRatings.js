import React, { useRef } from "react";
import "../../styles/reviewsratings.css";
import Rating from "@mui/material/Rating";
import { reviewData } from "../../constants/reviewData";

const ReviewsRatings = ({ rating, ratingamount }) => {
  const ratingAmountArray = () => {
    let sum = ratingamount;
    const numbers = [];
    for (let i = 0; i < 4; i++) {
      const randomNumber = Math.floor(Math.random() * sum);
      sum -= randomNumber < 0 ? 0 : randomNumber;
      numbers.push(randomNumber < 0 ? 0 : randomNumber);
    }
    numbers.push(sum);
    console.log(numbers);
    return numbers;
  };

  const ratingNumbers = useRef(ratingAmountArray());
  return (
    <div className="reviews-ratings-wrapper">
      <p className="reviews-title">Reviews</p>
      <div className="ratings-add-reviews-wrapper">
        <div className="ratings-wrapper">
          <div className="big-rating">
            <p className="rating">{rating}</p>
            <Rating
              name="read-only"
              value={parseFloat(rating)}
              precision={0.1}
              size="large"
              sx={{
                "& .MuiRating-iconFilled": {
                  color: "white",
                },
                "& .MuiRating-iconEmpty": {
                  color: "white",
                },

                fontSize: "2rem",
              }}
              readOnly
            />
            <p className="rating-amount">
              {"Based on " + ratingamount + " ratings"}
            </p>
          </div>
          <div className="small-rating">
            {ratingNumbers.current.map((amount, index) => {
              return (
                <div className="small-rating-line" key={index}>
                  <Rating
                    name="read-only"
                    value={5 - index}
                    precision={0.1}
                    size="medium"
                    readOnly

                    sx = {{color: "#CE7777"}}
                  />
                  {amount}
                </div>
              );
            })}
          </div>
        </div>

        <div className="add-review-wrapper">
          <p className="add-review-ask">Sudahkah kamu mencoba produk ini?</p>
          <p className="add-review-bonus">
            Review sekarang dan dapatkan 25 poin!
          </p>
          <button className="add-review-button">TAMBAH REVIEW</button>
        </div>
      </div>

      <div className="reviews-wrapper">
        {reviewData.map((review, index) => {
          return (
            <div>
              <p className="review-name">{review.name}</p>
              <div className="review-rating-date">
                <Rating
                  name="read-only"
                  value={review.rating}
                  precision={0.1}
                  size="medium"
                  readOnly
                  sx = {{color: "#CE7777"}}
                />
                {review.date}
              </div>
              <p className="review-review">{review.review}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewsRatings;
