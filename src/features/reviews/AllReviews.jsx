import React from "react";

import { useFetchReviewsQuery } from "./reviewApiSlice";
import Review from "./Review";

export const AllReviews = () => {
  const { data, isLoading, isSuccess, isError, error } = useFetchReviewsQuery();

  return (
    <div>
      {data?.reviews.map((review) => {
        return (
          <div key={review?._id}>
            <Review {...review} />
          </div>
        );
      })}
    </div>
  );
};
