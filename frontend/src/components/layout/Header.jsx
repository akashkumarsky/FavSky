// Header.jsx
import React, { useState } from 'react';
import Navbar from './Navbar';
import SideCart from '../cart/SideCart';

const Header = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const handleCartToggle = () => setIsCartOpen(!isCartOpen);

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between h-16">
                    <a href="/" className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
                        FavSky
                    </a>
                    <Navbar />

                </div>
            </div>
           
        </header>
    );
};

export default Header;
