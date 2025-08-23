// Newsletter.jsx
import React from 'react';

const Newsletter = () => (
    <section className="bg-gradient-to-r from-indigo-600 to-pink-500 py-16">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
            <div className="text-white mb-6 md:mb-0">
                <h2 className="text-3xl font-bold">Stay in the Loop</h2>
                <p className="mt-2 text-indigo-100">Subscribe to our newsletter for the latest updates and offers.</p>
            </div>
            <form className="w-full max-w-md">
                <div className="flex">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-grow px-5 py-3 rounded-l-full focus:ring-2 focus:ring-white outline-none"
                    />
                    <button className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-r-full hover:bg-gray-100">
                        Subscribe
                    </button>
                </div>
            </form>
        </div>
    </section>
);

export default Newsletter;
