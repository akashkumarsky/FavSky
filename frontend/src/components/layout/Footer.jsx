// Footer.jsx
import React from 'react';

const Footer = () => (
    <footer className="bg-gray-900 text-gray-300">
        <div className="border-t-4 border-indigo-600"></div>
        <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
            <div>
                <h3 className="text-xl font-bold text-white">FavSky</h3>
                <p className="mt-3 text-gray-400">Your one-stop shop for the latest fashion trends.</p>
            </div>
            <div>
                <h3 className="text-lg font-semibold text-white">Shop</h3>
                <ul className="mt-4 space-y-2">
                    {['Men', 'Women', 'Kids', 'Sale'].map(item => (
                        <li key={item}>
                            <a href="#" className="hover:text-white transition">{item}</a>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3 className="text-lg font-semibold text-white">Support</h3>
                <ul className="mt-4 space-y-2">
                    {['Contact Us', 'FAQ', 'Shipping & Returns'].map(item => (
                        <li key={item}>
                            <a href="#" className="hover:text-white transition">{item}</a>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3 className="text-lg font-semibold text-white">Follow Us</h3>
                <div className="flex space-x-4 mt-4">
                    {['Facebook', 'Instagram', 'Twitter'].map(social => (
                        <a key={social} href="#" className="hover:text-white transition">{social}</a>
                    ))}
                </div>
            </div>
        </div>
        <div className="text-center py-6 border-t border-gray-700 text-gray-500 text-sm">
            © 2024 FavSky. All rights reserved.
        </div>
    </footer>
);

export default Footer;
