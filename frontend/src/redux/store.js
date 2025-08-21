import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart/cartSlice';
import orderReducer from './order/orderSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    order: orderReducer,
  },
});
