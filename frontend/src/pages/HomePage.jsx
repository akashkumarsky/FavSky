import React from 'react';
import Header from '../components/layout/Header';
import HeroSection from '../components/home/HeroSection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import CategoriesSection from '../components/home/CategoriesSection';
import Newsletter from '../components/home/Newsletter';
import Footer from '../components/layout/Footer';

const HomePage = () => {
    return (
        <div className="bg-gray-50 font-sans">

            <main>
                <HeroSection />
                <FeaturedProducts />
                <CategoriesSection />
                <Newsletter />
            </main>

        </div>
    );
};

export default HomePage;
