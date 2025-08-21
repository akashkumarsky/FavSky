import React from 'react';

const HeroSection = () => (
    <div className="relative bg-gray-100 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="text-center md:text-left">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight">
                        <span className="block">New Season Arrivals</span>
                        <span className="block text-indigo-600">Check out all the trends</span>
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl text-gray-600">
                        Discover the latest in fashion. Quality and style for every occasion.
                    </p>
                    <div className="mt-8 flex justify-center md:justify-start">
                        <a href="#" className="inline-block bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105">
                            Shop Now
                        </a>
                    </div>
                </div>
                <div className="hidden md:block">
                    <img
                        src="https://cdn.pixabay.com/photo/2016/11/29/01/34/man-1866574_640.jpg?text=Stylish+Model"
                        alt="Fashion model"
                        className="rounded-lg shadow-xl"
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/cccccc/ffffff?text=Image+Error'; }}
                    />
                </div>
            </div>
        </div>
    </div>
);

export default HeroSection;
