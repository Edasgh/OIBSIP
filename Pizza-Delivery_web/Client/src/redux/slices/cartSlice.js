import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],

  reducers: {
    addToCart: (state, action) => {
      state.push(action.payload);
    },

    removeFromCart: (state, action) => {
      return state.filter((product) => product.id !== action.payload);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions; // functions as reducers are actions here
export default cartSlice.reducer; // and the slice is a reducer itself
