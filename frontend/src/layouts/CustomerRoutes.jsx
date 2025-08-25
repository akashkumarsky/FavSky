import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Cart from "../pages/Cart/Cart";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Product from "../pages/Product/Product";
import ProductDetails from "../pages/Product/ProductDetails"; // Import the new component

const CustomerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/products" element={<Product />} />
      <Route path="/product/:productId" element={<ProductDetails />} /> {/* Add the new route */}
    </Routes>
  );
};

export default CustomerRoutes;