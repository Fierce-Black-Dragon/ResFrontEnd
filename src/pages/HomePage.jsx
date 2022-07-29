import React, { useState } from "react";
import AddReview from "../features/reviews/AddReview";

import Products from "../features/products/ProductList";
import { AllReviews } from "./../features/reviews/AllReviews";
import "../style/homepage.css";
const HomePage = () => {
  const [reviews, setReviews] = useState([]);
  const [write, setWrite] = useState(false);
  return (
    <div style={{ minHeight: "80vh" }}>
      <div className="middle">
        <Products />

        <div className="reviews">
          <div className="write">
            {write ? (
              <AddReview write={write} setWrite={setWrite} />
            ) : (
              <button onClick={() => setWrite(!write)}>Write Review</button>
            )}
          </div>
          <div className="allReiews">
            <AllReviews />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
