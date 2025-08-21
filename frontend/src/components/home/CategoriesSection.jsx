import React from 'react';

const CategoryCard = ({ category }) => (
    <div className="relative rounded-lg overflow-hidden group">
        <img 
            src={category.imageUrl} 
            alt={category.name} 
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/500x350/cccccc/ffffff?text=Image+Error'; }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <h3 className="text-white text-2xl font-bold">{category.name}</h3>
        </div>
        <a href="#" className="absolute inset-0" aria-label={`Shop ${category.name}`}></a>
    </div>
);

const CategoriesSection = () => {
    const categories = [
        { name: "Men's Fashion", imageUrl: "https://placehold.co/500x350/3B82F6/FFFFFF?text=Men" },
        { name: "Women's Fashion", imageUrl: "https://placehold.co/500x350/EC4899/FFFFFF?text=Women" },
        { name: "Kid's Corner", imageUrl: "https://placehold.co/500x350/F59E0B/FFFFFF?text=Kids" },
    ];

    return (
        <div className="bg-gray-50 py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 text-center">Shop by Category</h2>
                <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {categories.map(cat => <CategoryCard key={cat.name} category={cat} />)}
                </div>
            </div>
        </div>
    );
}

export default CategoriesSection;
