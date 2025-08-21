import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/product/${product.id}`);
    };

    // Safe fallback values
    const safeProduct = {
        imageUrl: product?.imageUrl || 'https://placehold.co/400x400/cccccc/ffffff?text=No+Image',
        brand: product?.brand || 'No Brand',
        title: product?.title || 'Untitled Product',
        price: product?.price ?? 0.0,
        discountedPrice: product?.discountedPrice ?? 0.0,
        discountPersent: product?.discountPersent ?? 0,
    };

    return (
        <div
            onClick={handleNavigate}
            className="group relative bg-white/70 backdrop-blur-md border border-gray-200 
                 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl 
                 transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
        >
            {/* Image Section */}
            <div className="relative w-full aspect-square overflow-hidden">
                <img
                    src={safeProduct.imageUrl}
                    alt={safeProduct.title}
                    className="w-full h-full object-cover object-center 
                     transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                            'https://placehold.co/400x400/cccccc/ffffff?text=Image+Error';
                    }}
                />

                {/* Discount Badge */}
                {safeProduct.discountPersent > 0 && (
                    <span className="absolute top-3 right-3 bg-gradient-to-r from-pink-500 to-red-500 text-white 
                           text-xs font-semibold px-2 py-1 rounded-full shadow-md animate-pulse">
                        {safeProduct.discountPersent}% OFF
                    </span>
                )}
            </div>

            {/* Product Info */}
            <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-900 group-hover:text-pink-600 transition-colors">
                    {safeProduct.brand}
                </h3>
                <p className="text-sm text-gray-500 mt-1 truncate">{safeProduct.title}</p>

                {/* Pricing */}
                <div className="flex items-center mt-3">
                    <p className="text-lg font-bold text-pink-600 group-hover:scale-105 transition-transform">
                        ₹{safeProduct.discountedPrice.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-400 line-through ml-2">
                        ₹{safeProduct.price.toFixed(2)}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
