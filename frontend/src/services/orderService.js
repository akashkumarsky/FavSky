import api from './api';

export const createOrder = async (orderData) => {
  try {
    const response = await api.post('/api/orders/', orderData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getOrderById = async (orderId) => {
  try {
    const response = await api.get(`/api/orders/${orderId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getOrderHistory = async () => {
  try {
    const response = await api.get('/api/orders/user');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
