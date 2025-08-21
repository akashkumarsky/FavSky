import { useState, useEffect, useCallback } from 'react';

/**
 * A custom hook to handle API calls.
 * @param {Function} apiFunc - The API function to call (e.g., ProductService.getProducts).
 * @returns {Object} An object containing the data, loading state, error state, and a function to refetch the data.
 */
const useApi = (apiFunc) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (params) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiFunc(params);
      setData(result);
    } catch (err) {
      setError(err);
      console.error("API call failed:", err);
    } finally {
      setLoading(false);
    }
  }, [apiFunc]);

  useEffect(() => {
    // Initial fetch when the component mounts
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export default useApi;
