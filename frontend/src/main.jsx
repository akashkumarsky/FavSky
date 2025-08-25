import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // Import Router
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './context/Auth/AuthProvider.jsx';
import { ProductProvider } from './context/Product/ProductProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router> {/* Add Router here */}
      <AuthProvider>
        <ProductProvider>
          <App />
        </ProductProvider>
      </AuthProvider>
    </Router> {/* And close it here */}
  </React.StrictMode>
);