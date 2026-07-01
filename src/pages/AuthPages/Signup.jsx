import { useState } from "react";
import { signup , dbUserAdd }  from "../../utils/auth.js"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [username , setUsername] = useState(null);
    const [email , setEmail] = useState(null);
    const [password , setPassword] = useState(null);
    const [confirmpass , setConfirmpass] = useState(null);
    const navigate = useNavigate()

    const onSubmit = async (e) => {
        e.preventDefault();
        if(!username || !email || !password){
            toast.error("all Fields are required")
            return 
        }
        if(password != confirmpass){
            toast.error("password not match with confirm password")
            return 
        }
        const res = await signup(username,email,password)
        const dbres = await dbUserAdd(username,email,res.$id)
        navigate("/login")
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Create Account</h1>
                
                <form className="space-y-4" onSubmit={onSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">username</label>
                        <input
                            onChange={(e) => setUsername(e.target.value)}
                            type="text" 
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="John Doe"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input 
                            onChange={(e) => setEmail(e.target.value)}
                            type="email" 
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="you@example.com"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input 
                            onChange={(e) => setPassword(e.target.value)}
                            type="password" 
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="••••••••"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                        <input 
                            onChange={(e) => setConfirmpass(e.target.value)}
                            type="password" 
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="••••••••"
                        />
                    </div>
                    <div className="flex items-center">
                        <input 
                            type="checkbox" 
                            id="terms" 
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
                            I agree to the <a href="#" className="text-blue-600 hover:underline">Terms</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                        </label>
                    </div>
                    
                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 font-medium"
                    >
                        Sign Up
                    </button>
                </form>
                
                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account? <a href="/login" className="text-blue-600 hover:underline">Log in</a>
                </p>
            </div>
        </div>
    )
}

export default Signup;