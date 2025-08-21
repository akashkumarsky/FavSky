import React from 'react';
import ProductCard from '../products/ProductCard';

const FeaturedProducts = () => {
    const products = [
        { id: 1, name: 'Classic Tee', price: 29.99, imageUrl: 'https://placehold.co/400x400/F3F4F6/4A5568?text=Classic+Tee' },
        { id: 2, name: 'Denim Jeans', price: 89.99, imageUrl: 'https://placehold.co/400x400/E5E7EB/4A5568?text=Denim+Jeans' },
        { id: 3, name: 'Summer Dress', price: 120.00, imageUrl: 'https://placehold.co/400x400/D1D5DB/4A5568?text=Summer+Dress' },
        { id: 4, name: 'Leather Jacket', price: 250.00, imageUrl: 'https://placehold.co/400x400/9CA3AF/4A5568?text=Leather+Jacket' },
    ];

    return (
        <div className="bg-white py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 text-center">Featured Products</h2>
                <p className="text-center mt-2 text-gray-600">Our most loved styles, curated for you.</p>
                <div className="mt-10 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeaturedProducts;
