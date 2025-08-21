import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: null,
    loading: false,
    error: null,
  },
  reducers: {
    getCart: (state, action) => {
      state.cart = action.payload;
    },
  },
});

export const { getCart } = cartSlice.actions;
export default cartSlice.reducer;
