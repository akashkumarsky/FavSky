import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom"; // ✅ import useNavigate
import { useDispatch } from "react-redux";
import { addItemToCart } from "../redux/cart/cartSlice";
import Button from "../components/common/Button";
import ProductService from "../services/productService";
import useApi from "../hooks/useApi";
import { formatCurrency } from "../utils/formatters";
import { toast } from "react-toastify"; // ✅ import toast

const ProductDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // ✅ navigation hook
    const apiFunc = useCallback(() => ProductService.getProductById(id), [id]);
    const { data: product, loading, error, refetch } = useApi(apiFunc);

    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();

    useEffect(() => {
        refetch();
    }, [id, refetch]);

    const handleSizeSelect = (size) => setSelectedSize(size);

    const handleQuantityChange = (amount) => {
        setQuantity((prev) => Math.max(1, prev + amount));
    };

    const handleAddToCart = () => {
        const token = localStorage.getItem("jwt");
        const userData = localStorage.getItem("user");

        if (!token || !userData) {
            toast.error("⚠️ Please login to add items to your cart.");
            navigate("/login"); // ✅ redirect to login page
            return;
        }

        if (!selectedSize) {
            toast.warning("⚠️ Please select a size.");
            return;
        }

        const cartItem = {
            id: product.id,
            title: product.title,
            price: product.discountedPrice,
            size: selectedSize,
            quantity,
            imageUrl: product.imageUrl,
        };

        dispatch(addItemToCart(cartItem));
        toast.success("✅ Item added to cart!");
    };

    if (loading) return <p className="text-center text-gray-500">Loading product details...</p>;
    if (error) return <p className="text-center text-red-500">Failed to load product details.</p>;
    if (!product) return <p className="text-center text-gray-500">Product not found.</p>;

    return (
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid md:grid-cols-2 gap-10">
                {/* Product Image */}
                <div className="rounded-xl overflow-hidden shadow-xl">
                    <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                </div>

                {/* Product Info */}
                <div>
                    <h1 className="text-4xl font-extrabold mb-3 text-gray-900">{product.title}</h1>
                    <p className="text-gray-500 mb-4 text-lg">{product.brand}</p>

                    {/* Price */}
                    <div className="flex items-center mb-6">
                        <p className="text-3xl font-bold text-pink-600 mr-3">
                            {formatCurrency(product.discountedPrice)}
                        </p>
                        <p className="text-lg text-gray-400 line-through">
                            {formatCurrency(product.price)}
                        </p>
                    </div>

                    {/* Size Selection */}
                    <div className="mb-6">
                        <h3 className="font-semibold mb-3">Select Size</h3>
                        <div className="flex gap-3">
                            {product.sizes.map((size) => (
                                <button
                                    key={size.name}
                                    onClick={() => handleSizeSelect(size.name)}
                                    className={`px-4 py-2 rounded-full border transition ${selectedSize === size.name
                                            ? "bg-pink-600 text-white shadow-md"
                                            : "bg-white text-gray-700 hover:bg-gray-100"
                                        }`}
                                >
                                    {size.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center mb-6">
                        <h3 className="font-semibold mr-4">Quantity</h3>
                        <div className="flex items-center border rounded-full overflow-hidden">
                            <button
                                onClick={() => handleQuantityChange(-1)}
                                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition"
                            >
                                -
                            </button>
                            <span className="px-6 font-medium">{quantity}</span>
                            <button
                                onClick={() => handleQuantityChange(1)}
                                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <Button
                        onClick={handleAddToCart}
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 shadow-lg transition transform hover:scale-105"
                    >
                        Add to Cart
                    </Button>

                    {/* Description */}
                    <div className="mt-10">
                        <h3 className="font-semibold mb-2 text-lg">Description</h3>
                        <p className="text-gray-600 leading-relaxed">{product.description}</p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProductDetailsPage;
