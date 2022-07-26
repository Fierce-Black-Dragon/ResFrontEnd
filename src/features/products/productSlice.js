import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: null,
    product: null,
    new: false,
  },
  reducers: {
    setProducts: (state, action) => {
      const { products } = action.payload;
      state.products = products;
    },
    setNew: (state, action) => {
      state.new = true;
    },
    setRewind: (state, action) => {
      state.new = false;
    },
  },
});

export const { setProducts, setNew, setRewind } = productSlice.actions;

export default productSlice.reducer;
