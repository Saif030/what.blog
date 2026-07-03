import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { logo } from "../../assets/assets.js";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { refreshUser, loginUser } = useContext(AuthContext);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error("All fields are required");
            return;
        }
        setIsLoading(true);
        try {
            await loginUser(email, password);
            await refreshUser();
            navigate("/home");
        } catch (error) {
            toast.error("Login failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-4">
                    <img src={logo} alt="logo" className="h-24 mx-auto" />
                </div>

                {/* Login Card */}
                <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-8">
                    <h2 className="text-xl font-bold text-gray-100 mb-6">Sign In</h2>

                    <form className="space-y-5" onSubmit={onSubmit}>
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    type="email"
                                    className="w-full bg-[#0f0f0f] border border-gray-800 rounded-lg pl-10 pr-4 py-3 text-gray-100 placeholder-gray-600 focus:outline-none focus:border-[#612FFA] focus:ring-1 focus:ring-[#612FFA] transition"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                                <input
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    type="password"
                                    className="w-full bg-[#0f0f0f] border border-gray-800 rounded-lg pl-10 pr-4 py-3 text-gray-100 placeholder-gray-600 focus:outline-none focus:border-[#612FFA] focus:ring-1 focus:ring-[#612FFA] transition"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#612FFA] text-white py-3 rounded-lg font-semibold hover:bg-violet-600 transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-6">
                        <div className="flex-1 h-px bg-gray-800" />
                        <span className="text-xs text-gray-600 uppercase tracking-wider">or</span>
                        <div className="flex-1 h-px bg-gray-800" />
                    </div>

                    {/* Sign Up Link */}
                    <p className="text-center text-sm text-gray-500">
                        Don't have an account?{" "}
                        <Link
                            to="/signup"
                            className="text-[#612FFA] font-medium hover:underline"
                        >
                            Create one
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;