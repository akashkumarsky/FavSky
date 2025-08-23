// CategoriesSection.jsx
import React from 'react';

const CategoryCard = ({ category }) => (
  <div className="relative rounded-xl overflow-hidden group shadow-lg hover:shadow-2xl transition duration-500">
    <img
      src={category.imageUrl}
      alt={category.name}
      className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-center justify-center">
      <h3 className="text-white text-2xl font-bold drop-shadow-lg">{category.name}</h3>
    </div>
  </div>
);

const CategoriesSection = () => {
  const categories = [
    { name: "Men's Fashion", imageUrl: "https://placehold.co/500x350/3B82F6/FFFFFF?text=Men" },
    { name: "Women's Fashion", imageUrl: "https://placehold.co/500x350/EC4899/FFFFFF?text=Women" },
    { name: "Kid's Corner", imageUrl: "https://placehold.co/500x350/F59E0B/FFFFFF?text=Kids" },
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900">Shop by Category</h2>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map(cat => <CategoryCard key={cat.name} category={cat} />)}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
