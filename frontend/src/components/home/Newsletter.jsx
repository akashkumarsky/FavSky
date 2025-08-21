import React from 'react';

const Newsletter = () => (
    <div className="bg-indigo-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="text-white text-center md:text-left">
                    <h2 className="text-2xl font-bold">Stay in the Loop</h2>
                    <p className="mt-2">Subscribe to our newsletter for the latest updates and offers.</p>
                </div>
                <form className="mt-6 md:mt-0 w-full max-w-md">
                    <div className="flex items-center">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 rounded-l-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <button type="submit" className="bg-indigo-500 text-white px-6 py-2 rounded-r-md hover:bg-indigo-600">
                            Subscribe
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
);

export default Newsletter;
