import { useState, useEffect, createContext } from 'react';
import api from '../../config/api';
import { ProductContext } from './ProductContext';

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/products');
      // The backend returns a paginated response, the products are in `response.data.content`
      setProducts(response.data.content);
      setError(null);
    } catch (err) {
      setError(err);
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading, error, getProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
