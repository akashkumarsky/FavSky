import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Auth/AuthContext";

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState(null);
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const { confirmPassword, ...registerData } = formData;
            await register(registerData);
            navigate("/");
        } catch (err) {
            setError("Registration failed. Please try again.");
            console.error(err);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 to-pink-100">
            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Create Your Account
                </h2>

                {error && (
                    <p className="text-red-500 text-sm font-medium mb-4 text-center">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* First + Last Name in same row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label
                                htmlFor="firstName"
                                className="block text-sm font-semibold text-gray-700 mb-1"
                            >
                                First Name
                            </label>
                            <input
                                id="firstName"
                                type="text"
                                placeholder="John"
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="lastName"
                                className="block text-sm font-semibold text-gray-700 mb-1"
                            >
                                Last Name
                            </label>
                            <input
                                id="lastName"
                                type="text"
                                placeholder="Doe"
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-700 mb-1"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
                        />
                    </div>

                    {/* Mobile */}
                    <div>
                        <label
                            htmlFor="mobile"
                            className="block text-sm font-semibold text-gray-700 mb-1"
                        >
                            Mobile Number
                        </label>
                        <input
                            id="mobile"
                            type="tel"
                            placeholder="123-456-7890"
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-700 mb-1"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="********"
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-semibold text-gray-700 mb-1"
                        >
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="********"
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full py-2 mt-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:from-purple-600 hover:to-pink-600 transition-all"
                    >
                        Register
                    </button>
                </form>

                {/* Link */}
                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-purple-600 font-semibold hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
