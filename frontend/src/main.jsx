import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // Import Router
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './context/Auth/AuthProvider.jsx';
import { ProductProvider } from './context/Product/ProductProvider.jsx';
import { CartProvider } from './context/Cart/CartProvider.jsx'; // Import CartProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <ProductProvider>
          <CartProvider> {/* Add CartProvider here */}
            <App />
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);