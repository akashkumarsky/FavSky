import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../../config/api';
import { ProductContext } from './ProductContext';

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null); // State for single product
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  const getProducts = async (params) => {
    try {
      setLoading(true);
      const response = await api.get('/api/products', { params });
      setProducts(response.data.content);
      setPagination({
        totalPages: response.data.totalPages,
        totalElements: response.data.totalElements,
        currentPage: response.data.number,
      });
      setError(null);
    } catch (err) {
      setError(err);
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  // New function to find a single product by ID
  const findProductById = async (productId) => {
    try {
      setLoading(true);
      const { data } = await api.get(`/api/products/id/${productId}`);
      setProduct(data);
      setError(null);
    } catch (err) {
      setError(err);
      console.error(`Error fetching product with id ${productId}:`, err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const params = Object.fromEntries(searchParams.entries());

    const pageNumber = parseInt(params.pageNumber) || 1;
    params.pageNumber = pageNumber > 0 ? pageNumber - 1 : 0;

    getProducts(params);
  }, [location.search]);

  return (
    <ProductContext.Provider value={{ products, product, pagination, loading, error, findProductById }}>
      {children}
    </ProductContext.Provider>
  );
};