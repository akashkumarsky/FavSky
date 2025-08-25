import { Link } from "react-router-dom";
import { Star } from "lucide-react"; // for ratings star icon

const ProductCard = ({ product, onAddToCart }) => {
    return (
        <Link
            to={`/product/${product.id}`}
            className="group block rounded-2xl overflow-hidden relative bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-300"
        >
            {/* Image */}
            <div className="relative overflow-hidden">
                <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-500"
                />

                {/* Overlay for hover effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Discount Badge */}
                {product.discountPersent > 0 && (
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                        {product.discountPersent}% OFF
                    </span>
                )}

                {/* Ratings Badge */}
                <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-gray-800 text-xs font-medium px-2 py-1 rounded-full shadow-md flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    {product.numRatings}
                </span>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col space-y-2">
                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-purple-700 transition-colors truncate">
                    {product.title}
                </h3>

                {/* Brand */}
                <p className="text-sm text-gray-500">by {product.brand}</p>

                {/* Price + Color Symbol in same line */}
                <div className="flex items-center gap-2 pt-2">
                    {product.color && (
                        <span
                            className="w-5 h-5 rounded-full border border-gray-300"
                            style={{ backgroundColor: product.color }}
                        ></span>
                    )}
                    <span className="text-lg font-bold text-green-600">
                        ${product.discountedPrice}
                    </span>
                    {product.discountPersent > 0 && (
                        <span className="text-sm text-gray-500 line-through">
                            ${product.price}
                        </span>
                    )}
                </div>

                {/* Add to Cart Button */}
                <button
                    onClick={(e) => {
                        e.preventDefault(); // stop Link navigation
                        onAddToCart(product);
                    }}
                    className="mt-3 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium py-2 rounded-lg shadow-md hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                >
                    Add to Cart
                </button>
            </div>
        </Link>
    );
};

export default ProductCard;
