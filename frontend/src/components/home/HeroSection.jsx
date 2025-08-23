// HeroSection.jsx
import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => (
    <div className="relative bg-gradient-to-r from-indigo-50 via-white to-indigo-50 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
            <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Text */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center md:text-left"
                >
                    <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                        <span className="block">New Season Arrivals</span>
                        <span className="block bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
                            Check out all the trends
                        </span>
                    </h1>
                    <p className="mt-6 text-lg text-gray-600">
                        Discover the latest in fashion. Quality and style for every occasion.
                    </p>
                    <div className="mt-8 flex justify-center md:justify-start">
                        <a
                            href="#"
                            className="inline-block bg-indigo-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl hover:bg-indigo-700 transition-transform transform hover:scale-105"
                        >
                            Shop Now
                        </a>
                    </div>
                </motion.div>

                {/* Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="hidden md:block"
                >
                    <img
                        src="https://cdn.pixabay.com/photo/2016/11/29/01/34/man-1866574_640.jpg"
                        alt="Fashion model"
                        className="rounded-2xl shadow-2xl"
                    />
                </motion.div>
            </div>
        </div>
    </div>
);

export default HeroSection;
