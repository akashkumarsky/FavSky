// src/components/cart/SideCart.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeCartItem, updateCartItem } from '../../redux/cart/cartSlice';

const SideCart = ({ onClose }) => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);

    const handleRemoveItem = (itemId) => {
        dispatch(removeCartItem(itemId));
    };

    const handleUpdateQuantity = (itemId, quantity) => {
        if (quantity > 0) {
            dispatch(updateCartItem({ itemId, quantity }));
        }
    };

    const calculateSubtotal = () => {
        if (!cart || !cart.cartItems) return 0;
        return cart.cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
    };

    return (
        <div className="h-full flex flex-col bg-white shadow-2xl w-96 animate-slideIn">
            {/* Header */}
            <div className="flex justify-between items-center border-b px-6 py-4">
                <h2 className="text-lg font-semibold text-gray-800">Shopping Cart</h2>
                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-red-500 transition"
                >
                    ✖
                </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {cart && cart.cartItems && cart.cartItems.length > 0 ? (
                    cart.cartItems.map((item) => (
                        <div
                            key={item.id + item.size}
                            className="flex items-center space-x-4 border rounded-lg p-3 shadow-sm hover:shadow-md transition"
                        >
                            <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="w-16 h-16 object-cover rounded-md"
                            />
                            <div className="flex-1">
                                <h3 className="text-sm font-semibold text-gray-800">
                                    {item.title}
                                </h3>
                                <p className="text-xs text-gray-500">Size: {item.size}</p>
                                <p className="text-sm text-pink-600 font-semibold">
                                    ${item.price}
                                </p>

                                {/* Quantity Controls */}
                                <div className="flex items-center space-x-2 mt-2">
                                    <button
                                        onClick={() =>
                                            handleUpdateQuantity(item.id, item.quantity - 1)
                                        }
                                        className="px-2 py-1 border rounded hover:bg-gray-100"
                                    >
                                        -
                                    </button>
                                    <span className="px-3 text-gray-800">{item.quantity}</span>
                                    <button
                                        onClick={() =>
                                            handleUpdateQuantity(item.id, item.quantity + 1)
                                        }
                                        className="px-2 py-1 border rounded hover:bg-gray-100"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <button
                                onClick={() => handleRemoveItem(item.id)}
                                className="text-xs text-red-500 hover:underline"
                            >
                                Remove
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">Your cart is empty.</p>
                )}
            </div>

            {/* Footer */}
            <div className="border-t px-6 py-4 space-y-3">
                <div className="flex justify-between text-gray-800 font-semibold">
                    <span>Subtotal</span>
                    <span>${calculateSubtotal().toFixed(2)}</span>
                </div>
                <Link
                    to="/cart"
                    onClick={onClose}
                    className="block text-center w-full py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
                >
                    View Cart
                </Link>
                <Link
                    to="/checkout"
                    onClick={onClose}
                    className="block text-center w-full py-2 rounded-lg bg-pink-600 text-white font-medium hover:bg-pink-700 transition"
                >
                    Checkout
                </Link>
            </div>
        </div>
    );
};

export default SideCart;
