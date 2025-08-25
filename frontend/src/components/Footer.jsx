const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between">
                    <div className="w-full sm:w-1/2 md:w-1/4 mb-4">
                        <h3 className="text-lg font-bold mb-2">About Us</h3>
                        <p>
                            Your one-stop shop for the latest trends in fashion.
                        </p>
                    </div>
                    <div className="w-full sm:w-1/2 md:w-1/4 mb-4">
                        <h3 className="text-lg font-bold mb-2">Customer Service</h3>
                        <ul>
                            <li>
                                <a href="#">Contact Us</a>
                            </li>
                            <li>
                                <a href="#">FAQs</a>
                            </li>
                            <li>
                                <a href="#">Shipping & Returns</a>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full sm:w-1/2 md:w-1/4 mb-4">
                        <h3 className="text-lg font-bold mb-2">Follow Us</h3>
                        <ul>
                            <li>
                                <a href="#">Facebook</a>
                            </li>
                            <li>
                                <a href="#">Twitter</a>
                            </li>
                            <li>
                                <a href="#">Instagram</a>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full sm:w-1/2 md:w-1/4 mb-4">
                        <h3 className="text-lg font-bold mb-2">Subscribe</h3>
                        <form>
                            <input
                                type="email"
                                placeholder="Your email"
                                className="w-full p-2 rounded text-gray-800"
                            />
                            <button
                                type="submit"
                                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;