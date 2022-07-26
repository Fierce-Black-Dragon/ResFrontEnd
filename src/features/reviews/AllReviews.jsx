import React from "react";
import Review from "./review";
import { useFetchReviewsQuery } from "./reviewApiSlice";

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
