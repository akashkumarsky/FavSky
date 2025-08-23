import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductList from '../components/products/ProductList';
import ProductFilter from '../components/filter/ProductFilter';
import Pagination from '../components/common/Pagination';
import ProductService from '../services/productService';
import useApi from '../hooks/useApi';

const ProductsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [paginationData, setPaginationData] = useState({
    currentPage: 0,
    totalPages: 1,
  });

  const { data, loading, error, refetch } = useApi(ProductService.getProducts);

  // ✅ Sync filters/pagination with URL
  const updateUrlAndRefetch = (newParams) => {
    const searchParams = new URLSearchParams(location.search);

    Object.keys(newParams).forEach((key) => {
      if (newParams[key] !== undefined && newParams[key] !== null) {
        if (Array.isArray(newParams[key])) {
          searchParams.delete(key);
          newParams[key].forEach((val) => searchParams.append(key, val));
        } else {
          searchParams.set(key, newParams[key]);
        }
      }
    });

    navigate({ search: searchParams.toString() });
  };

  const handleFilterChange = (filters) => {
    updateUrlAndRefetch({ ...filters, pageNumber: 0 }); // reset to page 0 on filter change
  };

  const handlePageChange = (pageNumber) => {
    updateUrlAndRefetch({ pageNumber });
  };

  // ✅ Fetch products whenever search params change
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const params = {
      category: searchParams.getAll('category'),
      brand: searchParams.getAll('brand'),
      color: searchParams.getAll('color'),
      size: searchParams.getAll('size'),
      sort: searchParams.get('sort') || 'price_low',
      pageNumber: parseInt(searchParams.get('pageNumber')) || 0,
      pageSize: 12,
      minPrice: searchParams.get('minPrice') || 0,
      maxPrice: searchParams.get('maxPrice') || 10000,
      minDiscount: searchParams.get('discountPercent') || 0, // ✅ match ProductFilter field
      stock: searchParams.get('stock') || '',
    };
    refetch(params);
  }, [location.search, refetch]);

  useEffect(() => {
    if (data) {
      setProducts(data.content || []);
      setPaginationData({
        currentPage: data.number,
        totalPages: data.totalPages,
      });
    }
  }, [data]);

  return (
    <div>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <ProductFilter onFilterChange={handleFilterChange} />

          <div className="lg:col-span-3">
            <h1 className="text-3xl font-bold mb-8">Our Products</h1>

            {loading && (
              <p className="text-center text-gray-500">Loading products...</p>
            )}
            {error && (
              <p className="text-center text-red-500">
                Failed to load products. Please try again later.
              </p>
            )}

            {!loading && !error && (
              <>
                <ProductList products={products} />
                <Pagination
                  currentPage={paginationData.currentPage}
                  totalPages={paginationData.totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </div>
        </div>
      </main>

    </div>
  );
};

export default ProductsPage;
