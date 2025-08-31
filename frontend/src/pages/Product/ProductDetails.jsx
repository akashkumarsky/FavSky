import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductContext } from '../../context/Product/ProductContext';
import { CartContext } from '../../context/Cart/CartContext';
import { Star } from 'lucide-react';
import { sizeGuide } from './FilterData';

const ProductDetails = () => {
    const { productId } = useParams();
    const { product, findProductById, loading } = useContext(ProductContext);
    const { addItemToCart } = useContext(CartContext);
    const [selectedSize, setSelectedSize] = useState('');

    useEffect(() => {
        if (productId) {
            findProductById(productId);
        }
    }, [productId]);

    const handleAddToCart = () => {
        if (selectedSize) {
            const itemData = {
                productId: product.id,
                size: selectedSize,
                quantity: 1,
            };
            addItemToCart(itemData);
        } else {
            alert("Please select a size.");
        }
    };

    const getSizesForCategory = (categoryName) => {
        const category = categoryName?.toLowerCase();
        if (category.includes('jean')) {
            return sizeGuide.bottoms;
        }
        return sizeGuide.tops;
    };

    if (loading || !product) {
        return <div className="text-center py-20">Loading...</div>;
    }

    const availableSizes = getSizesForCategory(product.category?.name);

    return (
        <div className="bg-white">
            <div className="pt-6">
                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8">
                        {/* Image gallery */}
                        <div className="flex flex-col items-center">
                            <div className="overflow-hidden rounded-lg max-w-md w-full">
                                <img
                                    src={product.imageUrl}
                                    alt={product.title}
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>
                        </div>

                        {/* Product info */}
                        <div className="lg:col-span-1 pt-10 lg:pt-0">
                            <div className="lg:border-r lg:border-gray-200 lg:pr-8">
                                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.brand}</h1>
                                <h2 className="text-xl text-gray-600 mt-1">{product.title}</h2>
                            </div>

                            {/* Options */}
                            <div className="mt-4 lg:row-span-3 lg:mt-0">
                                <h2 className="sr-only">Product information</h2>
                                <div className='flex space-x-5 items-center text-lg lg:text-xl text-gray-900 mt-6'>
                                    <p className='font-semibold'>${product.discountedPrice}</p>
                                    <p className='opacity-50 line-through'>${product.price}</p>
                                    <p className='text-green-600 font-semibold'>{product.discountPersent}% Off</p>
                                </div>

                                {/* Reviews */}
                                <div className="mt-6">
                                    <div className="flex items-center">
                                        <div className="flex items-center text-yellow-500">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`w-5 h-5 ${i < 4 ? 'fill-current' : 'text-gray-300'}`} />
                                            ))}
                                        </div>
                                        <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                            {product.numRatings} ratings
                                        </p>
                                    </div>
                                </div>

                                <form className="mt-10">
                                    {/* Sizes */}
                                    <div className="mt-10">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-sm font-medium text-gray-900">Size</h3>
                                        </div>

                                        <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-5 mt-4">
                                            {availableSizes.map((size) => (
                                                <button
                                                    key={size.name}
                                                    type="button"
                                                    onClick={() => setSelectedSize(size.name)}
                                                    disabled={!size.inStock}
                                                    className={`group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 
                                                        ${selectedSize === size.name ? 'ring-2 ring-indigo-500' : ''}
                                                        ${!size.inStock ? 'bg-gray-50 text-gray-200 cursor-not-allowed' : 'bg-white text-gray-900'}`}
                                                >
                                                    {size.name}
                                                    {!size.inStock && (
                                                        <span className="absolute -inset-px rounded-md border-2 border-gray-200 pointer-events-none">
                                                            <svg className="absolute inset-0 h-full w-full stroke-2 text-gray-200" viewBox="0 0 100 100" preserveAspectRatio="none" stroke="currentColor">
                                                                <line x1="0" y1="100" x2="100" y2="0" vectorEffect="non-scaling-stroke"></line>
                                                            </svg>
                                                        </span>
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleAddToCart}
                                        className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Add to bag
                                    </button>
                                </form>
                            </div>

                            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                                {/* Description and details */}
                                <div>
                                    <h3 className="sr-only">Description</h3>
                                    <div className="space-y-6">
                                        <p className="text-base text-gray-900">{product.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ProductDetails;