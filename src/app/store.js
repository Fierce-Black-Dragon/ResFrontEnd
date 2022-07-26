import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiScile";
import authReducer from "../features/auth/authSlice";
import productReducer from "../features/products/productSlice";
import reviewReducer from "../features/reviews/reviewSlice";
import cartReducer from "../features/cart/cartSlice";
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    product: productReducer,
    review: reviewReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
