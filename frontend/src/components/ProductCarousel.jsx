import { useContext } from "react";
import { ProductContext } from "../context/Product/ProductContext";
import ProductCard from "./ProductCard";

const ProductCarousel = () => {
    const { products, loading } = useContext(ProductContext);

    // Take the first 4 products for the carousel
    const featuredProducts = products.slice(0, 4);

    if (loading) {
        return <p>Loading featured products...</p>;
    }

    return (
        <div className="py-8">
            <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {featuredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductCarousel;