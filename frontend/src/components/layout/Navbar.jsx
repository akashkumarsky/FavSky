import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Helper component for SVG icons to avoid repetition
const Icon = ({ path, className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
);

// Icon components used in the Navbar
const MenuIcon = () => <Icon path="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />;
const XMarkIcon = () => <Icon path="M6 18L18 6M6 6l12 12" />;

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const location = useLocation();
    const cartItems = useSelector(state => state.cart.cart?.cartItems);

    // Check for user authentication on component mount
    useEffect(() => {
        const token = localStorage.getItem('jwt');
        const userData = localStorage.getItem('user');
        if (token && userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    // Navigation links configuration
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Products', path: '/products' },
        { name: 'Men', path: '/products?category=Men' },
        { name: 'Women', path: '/products?category=Women' },
        { name: 'Kids', path: '/products?category=Kids' },
        { name: 'Sale', path: '/products?category=Sale' },
    ];

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('user');
        setUser(null);
        window.location.href = '/login';
    };

    return (
        <nav className="bg-white shadow-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-600 hover:text-gray-800 focus:outline-none"
                            aria-controls="mobile-menu"
                            aria-expanded={isMenuOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? <XMarkIcon /> : <MenuIcon />}
                        </button>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex md:space-x-8">
                        {navLinks.map(link => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                className={({ isActive }) =>
                                    `font-medium transition duration-150 ease-in-out ${
                                        isActive
                                            ? 'text-indigo-600 border-b-2 border-indigo-600'
                                            : 'text-gray-600 hover:text-indigo-600'
                                    }`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}

                        {/* User-specific navigation */}
                        {user && (
                            <>
                                <NavLink
                                    to="/orders"
                                    className={({ isActive }) =>
                                        `font-medium transition duration-150 ease-in-out ${
                                            isActive
                                                ? 'text-indigo-600 border-b-2 border-indigo-600'
                                                : 'text-gray-600 hover:text-indigo-600'
                                        }`
                                    }
                                >
                                    Orders
                                </NavLink>
                                {user.role === 'ADMIN' && (
                                    <NavLink
                                        to="/admin"
                                        className={({ isActive }) =>
                                            `font-medium transition duration-150 ease-in-out ${
                                                isActive
                                                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                                                    : 'text-gray-600 hover:text-indigo-600'
                                            }`
                                        }
                                    >
                                        Admin
                                    </NavLink>
                                )}
                            </>
                        )}
                    </div>

                    {/* Desktop User Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        {!user ? (
                            <div className="flex items-center space-x-4">
                                <Link
                                    to="/login"
                                    className="text-gray-600 hover:text-indigo-600 font-medium transition duration-150 ease-in-out"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 font-medium transition duration-150 ease-in-out"
                                >
                                    Register
                                </Link>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <span className="text-gray-700 font-medium">
                                    Welcome, {user.firstName || user.email}
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="text-gray-600 hover:text-indigo-600 font-medium transition duration-150 ease-in-out"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
                <div className="md:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map(link => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsMenuOpen(false)}
                                className={({ isActive }) =>
                                    `block px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out ${
                                        isActive
                                            ? 'text-indigo-600 bg-indigo-50'
                                            : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                                    }`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}

                        {/* Mobile User-specific navigation */}
                        {user && (
                            <>
                                <NavLink
                                    to="/orders"
                                    onClick={() => setIsMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `block px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out ${
                                            isActive
                                                ? 'text-indigo-600 bg-indigo-50'
                                                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                                        }`
                                    }
                                >
                                    Orders
                                </NavLink>
                                {user.role === 'ADMIN' && (
                                    <NavLink
                                        to="/admin"
                                        onClick={() => setIsMenuOpen(false)}
                                        className={({ isActive }) =>
                                            `block px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out ${
                                                isActive
                                                    ? 'text-indigo-600 bg-indigo-50'
                                                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                                                }`
                                            }
                                    >
                                        Admin
                                    </NavLink>
                                )}
                            </>
                        )}

                        {/* Mobile User Actions */}
                        <div className="border-t border-gray-200 pt-3 mt-3">
                            {!user ? (
                                <div className="space-y-1">
                                    <Link
                                        to="/login"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block px-3 py-2 rounded-md text-base font-medium bg-indigo-600 text-white hover:bg-indigo-700"
                                    >
                                        Register
                                    </Link>
                                </div>
                            ) : (
                                <div className="px-3 py-2">
                                    <p className="text-sm text-gray-700 mb-2">
                                        Welcome, {user.firstName || user.email}
                                    </p>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsMenuOpen(false);
                                        }}
                                        className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
