import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeCartItem, updateCartItem } from '../../redux/cart/cartSlice';
import './cart.css';

const SideCart = ({ onClose }) => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.cart);

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
        return cart.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <div className="side-cart">
            <div className="side-cart-header">
                <h2>Shopping Cart</h2>
                <button onClick={onClose} className="close-btn">&times;</button>
            </div>
            <div className="side-cart-body">
                {cart && cart.cartItems && cart.cartItems.length > 0 ? (
                    cart.cartItems.map(item => (
                        <div key={item.id} className="cart-item">
                            <img src={item.product.imageUrl} alt={item.product.title} />
                            <div className="item-details">
                                <h3>{item.product.title}</h3>
                                <p>Size: {item.size}</p>
                                <p>Price: ${item.price}</p>
                                <div className="quantity-control">
                                    <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                                </div>
                            </div>
                            <button onClick={() => handleRemoveItem(item.id)} className="remove-btn">Remove</button>
                        </div>
                    ))
                ) : (
                    <p>Your cart is empty.</p>
                )}
            </div>
            <div className="side-cart-footer">
                <div className="subtotal">
                    <span>Subtotal:</span>
                    <span>${calculateSubtotal()}</span>
                </div>
                <Link to="/cart" className="btn-view-cart" onClick={onClose}>View Cart</Link>
                <Link to="/checkout" className="btn-checkout" onClick={onClose}>Checkout</Link>
            </div>
        </div>
    );
};

export default SideCart;
