import { useParams } from 'react-router-dom';

const ProductDetails = () => {
    const { productId } = useParams();
    // Here you would typically fetch the product details from your context or API
    // using the productId

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold">Product Details</h1>
            <p className="mt-4">Details for product with ID: {productId}</p>
        </div>
    );
};

export default ProductDetails;