import api from './api';

export const getAllOrders = async () => {
  try {
    const response = await api.get('/api/admin/orders/');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const confirmOrder = async (orderId) => {
  try {
    const response = await api.put(`/api/admin/orders/${orderId}/confirmed`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const shipOrder = async (orderId) => {
  try {
    const response = await api.put(`/api/admin/orders/${orderId}/ship`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deliverOrder = async (orderId) => {
  try {
    const response = await api.put(`/api/admin/orders/${orderId}/deliver`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const cancelOrder = async (orderId) => {
  try {
    const response = await api.put(`/api/admin/orders/${orderId}/cancel`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteOrder = async (orderId) => {
  try {
    const response = await api.delete(`/api/admin/orders/${orderId}/delete`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
