import React from "react";
import "./css/review.css";

import { FaUserCircle } from "react-icons/fa";
const Review = ({ id, name, comment, rating }) => {
  return (
    <div className="review" key={id}>
      <div className="review__header">
        <FaUserCircle className="review__icon" />
        <div className="review__name">{name}</div>
      </div>
      <p style={{ align: "center" }}> Comment: {comment}</p>
      <p>Rating:{rating} ⭐</p>
    </div>
  );
};

export default Review;
