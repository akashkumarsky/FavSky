import React from 'react';

const Footer = () => (
    <footer className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-lg font-semibold">FavSky</h3>
                    <p className="mt-2 text-gray-400">Your one-stop shop for the latest fashion trends.</p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Shop</h3>
                    <ul className="mt-4 space-y-2">
                        <li><a href="#" className="text-gray-400 hover:text-white">Men</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white">Women</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white">Kids</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white">Sale</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Support</h3>
                    <ul className="mt-4 space-y-2">
                        <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white">Shipping & Returns</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Follow Us</h3>
                    <div className="flex mt-4 space-x-4">
                        <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
                        <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
                        <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
                    </div>
                </div>
            </div>
            <div className="mt-8 border-t border-gray-700 pt-8 text-center text-gray-400">
                <p>&copy; 2024 FavSky. All rights reserved.</p>
            </div>
        </div>
    </footer>
);

export default Footer;
