import { Outlet, Link, useNavigate } from "react-router-dom";
import { useContext, useState } from 'react';
import { logout } from "../../utils/auth.js"
import { DataContext } from '../../context/DataContext.jsx';
import { AuthContext } from '../../context/AuthContext.jsx';
import { logo } from "../../assets/assets.js"
import { LogOut, Menu, X } from 'lucide-react';
import DotSpinner from "../../components/DotSpinner.jsx";

const Layout = () => {
    const { userData, isloading } = useContext(DataContext)
    const { logoutUser } = useContext(AuthContext)
    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false)

    const logout = async () => {
        await logoutUser()
        navigate("/login")
        return
    }

    if (isloading) {
        return (
            <div className='w-full h-screen flex items-center justify-center'>
                <DotSpinner />
            </div>
        )
    }

    return (
        <div className="py-[0.1px] min-h-screen bg-[#0f0f0f] text-gray-300">
            <header className="bg-transparent fixed z-50 w-full py-3 px-4">
                <div className="max-w-4xl bg-black/70 backdrop-blur-md rounded-full mx-auto px-4 md:px-6 flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-4 md:gap-8">
                        <a href="/" className="flex items-center gap-2 group">
                            <img className='h-12 md:h-18' src={logo} alt="" />
                        </a>
                        <p className="hidden lg:block text-gray-400 text-sm">
                            -Thoughts and images from our amazing planet.
                        </p>
                    </div>

                    {/* Desktop User Info */}
                    <div className="hidden md:flex justify-center items-center gap-3 relative cursor-pointer bg-zinc-900 py-2 px-4 rounded-full">
                        <Link to={"/profile"} className="h-8 w-8 rounded-full flex items-center justify-center bg-[#612FFA] text-white overflow-hidden">
                            {userData?.profile_pic ? <img className="h-full w-full object-cover" src={userData?.profile_pic} alt="" /> : <span>{userData?.username[0].toUpperCase()}</span>}
                        </Link>
                        <Link to={"/profile"} className="flex flex-col justify-center">
                            <p className='text-sm text-white'>{userData?.username}</p>
                            <p className='text-xs text-gray-300'>{userData?.email}</p>
                        </Link>
                        <button onClick={logout} className='cursor-pointer ml-2 rounded-lg text-white hover:text-red-400 transition'>
                            <LogOut size={18} />
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden text-white p-2 rounded-lg hover:bg-zinc-800 transition"
                    >
                        {menuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Dropdown Menu */}
                {menuOpen && (
                    <div className="md:hidden max-w-4xl mx-auto mt-2 bg-black/90 backdrop-blur-md rounded-2xl border border-gray-800 p-4 space-y-4">
                        {/* User Info Mobile */}
                        <div className="flex items-center gap-3 pb-4 border-b border-gray-800">
                            <Link
                                to={"/profile"}
                                onClick={() => setMenuOpen(false)}
                                className="h-10 w-10 rounded-full flex items-center justify-center bg-[#612FFA] text-white overflow-hidden flex-shrink-0"
                            >
                                {userData?.profile_pic ? (
                                    <img className="h-full w-full object-cover" src={userData?.profile_pic} alt="" />
                                ) : (
                                    <span className="text-lg">{userData?.username[0].toUpperCase()}</span>
                                )}
                            </Link>
                            <div>
                                <Link
                                    to={"/profile"}
                                    onClick={() => setMenuOpen(false)}
                                    className="text-white font-medium block"
                                >
                                    {userData?.username}
                                </Link>
                                <p className='text-xs text-gray-400'>{userData?.email}</p>
                            </div>
                        </div>

                        {/* Mobile Nav Links */}
                        <div className="space-y-2">
                            <Link
                                to={"/profile"}
                                onClick={() => setMenuOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-zinc-900 hover:text-white transition"
                            >
                                <span className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-sm">👤</span>
                                Profile
                            </Link>
                            <Link
                                to={"/post"}
                                onClick={() => setMenuOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-zinc-900 hover:text-white transition"
                            >
                                <span className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-sm">✍️</span>
                                Write Post
                            </Link>
                        </div>

                        {/* Logout */}
                        <button
                            onClick={() => {
                                setMenuOpen(false)
                                logout()
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition"
                        >
                            <LogOut size={18} />
                            Logout
                        </button>
                    </div>
                )}
            </header>
            <Outlet />
            {/* Footer */}
            <footer className="border-t border-gray-800 mt-6">
                <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <img className="h-18" src={logo} alt="" />
                        Proudly powered by Cosmic
                    </div>

                    <div className="flex items-center gap-5">
                        <a href="#" className="text-gray-500 hover:text-[#5eead4] transition">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                        <a href="#" className="text-gray-500 hover:text-[#5eead4] transition">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth="2" />
                                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
                            </svg>
                        </a>
                        <a href="#" className="text-gray-500 hover:text-[#5eead4] transition">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Layout;