import api from './api';

export const createPaymentLink = async (orderId) => {
  try {
    const response = await api.post(`/api/payments/${orderId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updatePaymentStatus = async (paymentData) => {
  try {
    const response = await api.get(`/api/payments`, { params: paymentData });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
