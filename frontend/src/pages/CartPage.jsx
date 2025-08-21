import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const CartPage = () => {
    return (
        <div>
            <Header />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold">Your Shopping Cart</h1>
                {/* Cart items and summary will go here */}
            </main>
            <Footer />
        </div>
    );
};

export default CartPage;
