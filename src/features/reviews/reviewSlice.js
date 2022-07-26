import { createSlice } from "@reduxjs/toolkit";

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    reviews: null,
  },
  reducers: {
    setReviews: (state, action) => {
      const { reviews } = action.payload;
      state.reviews = reviews;
    },
    logOut: (state, action) => {},
  },
});

export const { setReviews, logOut } = reviewSlice.actions;

export default reviewSlice.reducer;

export const getall = (state) => state.reviews;
// export const selectCurrentToken = (state) => state.review.token;
