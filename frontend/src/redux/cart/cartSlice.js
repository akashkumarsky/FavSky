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
    removeCartItem: (state, action) => {
      state.cart.cartItems = state.cart.cartItems.filter(item => item.id !== action.payload);
    },
    updateCartItem: (state, action) => {
      state.cart.cartItems = state.cart.cartItems.map(item =>
        item.id === action.payload.itemId ? { ...item, quantity: action.payload.quantity } : item
      );
    },
  },
});

export const { getCart, removeCartItem, updateCartItem } = cartSlice.actions;
export default cartSlice.reducer;
