import React, { useState } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Button from '../../components/common/Button';
import InputField from '../../components/common/InputField';
import ProductService from '../../services/productService';

const initialProductState = {
    title: '',
    description: '',
    price: '',
    discountedPrice: '',
    discountPersent: '',
    quantity: '',
    brand: '',
    color: '',
    imageUrl: '',
    topLavelCategory: '',
    secondLavelCategory: '',
    thirdLavelCategory: ''
};

const AdminProductPage = () => {
    const [productData, setProductData] = useState(initialProductState);
    const [sizes, setSizes] = useState([{ name: '', quantity: '' }]);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setProductData(prevState => ({ ...prevState, [id]: value }));
    };

    const handleSizeChange = (index, e) => {
        const { name, value } = e.target;
        const newSizes = [...sizes];
        newSizes[index][name] = value;
        setSizes(newSizes);
    };

    const addSizeField = () => {
        setSizes([...sizes, { name: '', quantity: '' }]);
    };

    const removeSizeField = (index) => {
        const newSizes = sizes.filter((_, i) => i !== index);
        setSizes(newSizes);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });
        setIsLoading(true);

        try {
            const formattedSizes = sizes
                .filter(s => s.name && s.quantity) // Filter out empty entries
                .map(s => ({ ...s, quantity: parseInt(s.quantity) }));

            const dataToSend = {
                ...productData,
                price: parseInt(productData.price),
                discountedPrice: parseInt(productData.discountedPrice),
                discountPersent: parseInt(productData.discountPersent),
                quantity: parseInt(productData.quantity),
                size: formattedSizes,
            };

            const response = await ProductService.createProduct(dataToSend);
            setMessage({ type: 'success', text: `Product "${response.title}" created successfully!` });
            // Clear the form on success
            setProductData(initialProductState);
            setSizes([{ name: '', quantity: '' }]);
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to create product. Please check the details and try again.' });
            console.error("Error creating product:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Header />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-3xl font-bold text-center mb-8">Add New Product</h1>
                    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 space-y-6">
                        <InputField id="title" label="Product Title" value={productData.title} onChange={handleChange} placeholder="e.g., Classic Cotton Tee" required />
                        <InputField id="brand" label="Brand" value={productData.brand} onChange={handleChange} placeholder="e.g., FavSky Basics" required />
                        <InputField id="color" label="Color" value={productData.color} onChange={handleChange} placeholder="e.g., Blue" required />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <InputField id="price" label="Price" type="number" value={productData.price} onChange={handleChange} placeholder="e.g., 29.99" required />
                            <InputField id="discountedPrice" label="Discounted Price" type="number" value={productData.discountedPrice} onChange={handleChange} placeholder="e.g., 19.99" required />
                            <InputField id="quantity" label="Total Quantity" type="number" value={productData.quantity} onChange={handleChange} placeholder="e.g., 100" required />
                        </div>
                        <InputField id="imageUrl" label="Image URL" value={productData.imageUrl} onChange={handleChange} placeholder="https://example.com/image.jpg" required />
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea id="description" rows="4" value={productData.description} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder="Describe the product..." required></textarea>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <InputField id="topLavelCategory" label="Top Category" value={productData.topLavelCategory} onChange={handleChange} placeholder="e.g., Men" required />
                            <InputField id="secondLavelCategory" label="Second Category" value={productData.secondLavelCategory} onChange={handleChange} placeholder="e.g., Clothing" required />
                            <InputField id="thirdLavelCategory" label="Third Category" value={productData.thirdLavelCategory} onChange={handleChange} placeholder="e.g., Shirts" required />
                        </div>

                        {/* Dynamic Size Fields */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Sizes</h3>
                            {sizes.map((size, index) => (
                                <div key={index} className="flex items-center gap-4 mb-2">
                                    <InputField name="name" label={`Size ${index + 1} Name`} value={size.name} onChange={(e) => handleSizeChange(index, e)} placeholder="e.g., M" />
                                    <InputField name="quantity" label="Quantity" type="number" value={size.quantity} onChange={(e) => handleSizeChange(index, e)} placeholder="e.g., 50" />
                                    {sizes.length > 1 && (
                                        <button type="button" onClick={() => removeSizeField(index)} className="text-red-500 hover:text-red-700 mt-6">Remove</button>
                                    )}
                                </div>
                            ))}
                            <Button type="button" variant="secondary" onClick={addSizeField} className="mt-2">Add Size</Button>
                        </div>

                        <div className="text-right">
                            <Button type="submit" variant="primary" disabled={isLoading}>
                                {isLoading ? 'Adding...' : 'Add Product'}
                            </Button>
                        </div>
                        {message.text && (
                            <p className={`text-center mt-4 ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                                {message.text}
                            </p>
                        )}
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AdminProductPage;
