import { useState, useEffect, useContext } from "react";
import api from "../../config/api";
import { AuthContext } from "../Auth/AuthContext";
import { CartContext } from "./CartContext";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const { authState } = useContext(AuthContext);

  const getCart = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/api/cart/");
      setCart(data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const addItemToCart = async (itemData) => {
    try {
      setLoading(true);
      await api.put("/api/cart/add", itemData);
      await getCart();
      setShowCart(true);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const removeItemFromCart = async (cartItemId) => {
    try {
      setLoading(true);
      await api.delete(`/api/cart/item/${cartItemId}`);
      await getCart(); // Refresh cart after removing
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const updateCartItemQuantity = async (cartItemId, quantity) => {
    try {
      setLoading(true);
      const item = cart.cartItems.find((item) => item.id === cartItemId);
      if (item) {
        const updatedItem = { ...item, quantity };
        await api.put(`/api/cart/item/${cartItemId}`, updatedItem);
        await getCart(); // Refresh cart after updating
      }
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authState.isAuthenticated) {
      getCart();
    }
  }, [authState.isAuthenticated]);

  return (
    <CartContext.Provider value={{ cart, loading, error, showCart, setShowCart, getCart, addItemToCart, removeItemFromCart, updateCartItemQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
