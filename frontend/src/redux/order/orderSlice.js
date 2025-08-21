import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderHistory } from '../../services/orderService';

export const fetchOrderHistory = createAsyncThunk(
  'order/fetchOrderHistory',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getOrderHistory();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrderHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
