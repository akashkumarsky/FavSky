// FeaturedProducts.jsx
import React from 'react';
import ProductCard from '../products/ProductCard';

const FeaturedProducts = () => {
    const products = [
        { id: 1, name: 'Classic Tee', price: 29.99, imageUrl: 'https://images.bewakoof.com/uploads/grid/app/1x1-J-P-men--1755766224.jpg?text=Classic+Tee' },
        { id: 2, name: 'Denim Jeans', price: 89.99, imageUrl: 'https://images.bewakoof.com/uploads/grid/app/1x1-Denimverse-Men-BANNER--1--1755761906.jpg?text=Denim+Jeans' },
        { id: 3, name: 'Summer Dress', price: 120.00, imageUrl: 'https://images.bewakoof.com/uploads/grid/app/1x1-J-P-men--1755766224.jpg?text=Summer+Dress' },
        { id: 4, name: 'Leather Jacket', price: 250.00, imageUrl: 'https://images.bewakoof.com/uploads/grid/app/1x1---shirts-1755681571.jpg?text=Leather+Jacket' },
    ];

    return (
        <section className="bg-white py-20">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center text-gray-900">Featured Products</h2>
                <p className="text-center mt-2 text-gray-500">Our most loved styles, curated for you.</p>
                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {products.map(product => (
                        <div key={product.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition transform hover:scale-105 p-4">
                            <ProductCard product={product}  />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;
