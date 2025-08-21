import api from './api';

export const getCart = async () => {
  try {
    const response = await api.get('/api/cart/');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const addItemToCart = async (itemData) => {
  try {
    const response = await api.put('/api/cart/add', itemData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateCartItem = async (itemId, itemData) => {
  try {
    const response = await api.put(`/api/cart_items/${itemId}`, itemData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const removeCartItem = async (itemId) => {
  try {
    const response = await api.delete(`/api/cart_items/${itemId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
