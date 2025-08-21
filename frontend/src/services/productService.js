import api from './api';

const ProductService = {
  // Function to get all products with filtering and pagination
  getProducts: async (params) => {
    try {
      const response = await api.get('/api/products', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Function to get a single product by its ID
  getProductById: async (productId) => {
    try {
      const response = await api.get(`/api/products/id/${productId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product with id ${productId}:`, error);
      throw error;
    }
  },

  // Function to search for products
  searchProducts: async (query) => {
    try {
      const response = await api.get('/api/products/search', {
        params: { q: query },
      });
      return response.data;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  },
};

export default ProductService;
