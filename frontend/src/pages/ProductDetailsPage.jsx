import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../redux/cart/cartSlice';
import Header from '../components/layout/Header';

import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';
import ProductService from '../services/productService';
import useApi from '../hooks/useApi';
import { formatCurrency } from '../utils/formatters';

const ProductDetailsPage = () => {
    const { id } = useParams();
    const apiFunc = useCallback(() => ProductService.getProductById(id), [id]);
    const { data: product, loading, error, refetch } = useApi(apiFunc);
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();

    useEffect(() => {
        refetch();
    }, [id, refetch]);


    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    };

    const handleQuantityChange = (amount) => {
        setQuantity((prev) => Math.max(1, prev + amount));
    };

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert('Please select a size.');
            return;
        }
        // Implement add to cart logic here
        const cartItem = {
            product,
            size: selectedSize,
            quantity,
        };
        dispatch(addItemToCart(cartItem));
    };


    if (loading) {
        return <p className="text-center text-gray-500">Loading product details...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">Failed to load product details.</p>;
    }

    if (!product) {
        return <p className="text-center text-gray-500">Product not found.</p>;
    }

    return (
        <div>
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Product Image Gallery */}
                    <div>
                        <img
                            src={product.imageUrl}
                            alt={product.title}
                            className="w-full h-auto object-cover rounded-lg shadow-lg"
                        />
                    </div>

                    {/* Product Info */}
                    <div>
                        <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
                        <p className="text-gray-500 mb-4">{product.brand}</p>

                        <div className="flex items-center mb-4">
                            <p className="text-2xl font-bold text-pink-600 mr-2">
                                {formatCurrency(product.discountedPrice)}
                            </p>
                            <p className="text-lg text-gray-400 line-through">
                                {formatCurrency(product.price)}
                            </p>
                        </div>

                        {/* Size Selection */}
                        <div className="mb-6">
                            <h3 className="font-semibold mb-2">Select Size</h3>
                            <div className="flex gap-2">
                                {product.sizes.map((size) => (
                                    <button
                                        key={size.name}
                                        onClick={() => handleSizeSelect(size.name)}
                                        className={`px-4 py-2 border rounded-md ${selectedSize === size.name
                                            ? 'bg-pink-600 text-white'
                                            : 'bg-white text-gray-700'
                                            }`}
                                    >
                                        {size.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity Selector */}
                        <div className="flex items-center mb-6">
                            <h3 className="font-semibold mr-4">Quantity</h3>
                            <div className="flex items-center border rounded-md">
                                <button
                                    onClick={() => handleQuantityChange(-1)}
                                    className="px-3 py-1"
                                >
                                    -
                                </button>
                                <span className="px-4">{quantity}</span>
                                <button
                                    onClick={() => handleQuantityChange(1)}
                                    className="px-3 py-1"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <Button onClick={handleAddToCart}>Add to Cart</Button>

                        <div className="mt-8">
                            <h3 className="font-semibold mb-2">Description</h3>
                            <p className="text-gray-600">{product.description}</p>
                        </div>
                    </div>
                </div>
            </main>

        </div>
    );
};

export default ProductDetailsPage;
