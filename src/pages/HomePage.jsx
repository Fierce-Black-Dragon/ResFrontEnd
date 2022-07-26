import React, { useState } from "react";
import AddReview from "../features/reviews/AddReview";
import Review from "../features/reviews/review";
import Products from "../features/products/ProductList";
import { AllReviews } from "./../features/reviews/AllReviews";

const HomePage = () => {
  const [reviews, setReviews] = useState([]);
  const [write, setWrite] = useState(false);
  return (
    <div style={{ minHeight: "80vh" }}>
      <div className="middle">
        <Products />
      </div>
      <div className="write">
        {write ? (
          <AddReview write={write} setWrite={setWrite} />
        ) : (
          <button onClick={() => setWrite(!write)}>Write Review</button>
        )}
        <Review name="test" comment="test" rating={1.5} />
      </div>
      <div className="allReiews">
        <AllReviews />
      </div>
    </div>
  );
};

export default HomePage;
