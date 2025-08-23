import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: { cartItems: [] },
    loading: false,
    error: null,
  },
  reducers: {
    getCart: (state, action) => {
      state.cart = action.payload;
    },
    addItemToCart: (state, action) => {
      // check if item already exists (same id + size)
      const existingItem = state.cart.cartItems.find(
        (item) =>
          item.id === action.payload.id && item.size === action.payload.size
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.cart.cartItems.push(action.payload);
      }
    },
    removeCartItem: (state, action) => {
      state.cart.cartItems = state.cart.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    updateCartItem: (state, action) => {
      state.cart.cartItems = state.cart.cartItems.map((item) =>
        item.id === action.payload.itemId
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
    },
  },
});

export const { getCart, addItemToCart, removeCartItem, updateCartItem } =
  cartSlice.actions;

export default cartSlice.reducer;
