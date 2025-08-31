import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth/AuthContext";
import { CartContext } from "../context/Cart/CartContext";
import { ShoppingBag } from "lucide-react";

const Header = () => {
    const { authState, logout } = useContext(AuthContext);
    const { cart, setShowCart } = useContext(CartContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <Link to="/" className="text-2xl font-bold">
                        Favsky
                    </Link>
                    <nav>
                        <ul className="flex space-x-4 items-center">
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/products">Products</Link>
                            </li>
                            <li className="relative">
                                <button
                                    onClick={() => setShowCart(true)}
                                    className="flex items-center"
                                >
                                    <ShoppingBag />
                                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                                        {cart?.cartItems?.length || 0}
                                    </span>
                                </button>
                            </li>
                            {authState.isAuthenticated ? (
                                <>
                                    <li className="font-semibold">
                                        Welcome, {authState.user?.firstName}
                                    </li>
                                    <li>
                                        <button
                                            onClick={handleLogout}
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <li>
                                    <Link to="/login">Login</Link>
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;