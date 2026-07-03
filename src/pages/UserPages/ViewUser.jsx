import { useContext } from "react";
import { DataContext } from "../../context/DataContext.jsx";
import { X, Mail, FileText, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const ViewUser = () => {
    const { isViewingUser, setisViewingUser , viewUser , viewUserPosts } = useContext(DataContext);

    if (!isViewingUser) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => setisViewingUser(null)}
            />

            {/* Modal Box */}
            <div className="h-[75vh] w-[90vw] sm:w-[70vw] md:w-[50vw] lg:w-[35vw] bg-[#1a1a1a] border border-gray-800 rounded-2xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col overflow-hidden shadow-2xl">
                
                {/* Close Button */}
                <button
                    onClick={() => setisViewingUser(null)}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-gray-400 hover:text-white hover:bg-black/70 transition"
                >
                    <X size={20} />
                </button>

                {/* Scrollable Content */}
                <div className="overflow-y-auto flex-1 custom-scrollbar">
                    
                    {/* Profile Header */}
                    <div className="relative">
                        {/* Cover Banner */}
                        <div className="h-32 bg-gradient-to-br from-[#612FFA]/30 to-black" />
                        
                        {/* Avatar */}
                        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                            <div className="w-24 h-24 rounded-full border-4 border-[#1a1a1a] overflow-hidden bg-[#612FFA]">
                                {viewUser?.profile_pic ? (
                                    <img 
                                        src={viewUser?.profile_pic} 
                                        alt={viewUser?.username}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-white text-2xl font-bold">
                                        {viewUser?.username[0].toUpperCase()}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Profile Info */}
                    <div className="pt-14 px-6 pb-6 text-center border-b border-gray-800">
                        <h2 className="text-xl font-bold text-gray-100">@{viewUser?.username}</h2>
                        
                        <div className="flex items-center justify-center gap-2 mt-2 text-gray-500 text-sm">
                            <Mail size={14} />
                            <span>{viewUser?.email}</span>
                        </div>

                        <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                            {viewUser?.bio}
                        </p>

                        <div className="flex items-center justify-center gap-6 mt-4">
                            <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                                <Calendar size={14} />
                                <span>Joined {new Date(viewUser?.$createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                                <FileText size={14} />
                                <span>{viewUserPosts?.total} posts</span>
                            </div>
                        </div>
                    </div>

                    {/* Posts Section */}
                    <div className="px-4 py-6">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2">
                            Posts by {viewUserPosts?.author_name}
                        </h3>

                        <div className="space-y-4">
                            {viewUserPosts?.rows?.map((post) => (
                                <div 
                                    key={post.$id}
                                    className="bg-[#0f0f0f] border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition group cursor-pointer"
                                >
                                    <img
                                        src={post.image_url}
                                        alt={post.title}
                                        className="w-full h-40 object-cover group-hover:scale-105 transition duration-500"
                                    />
                                    <div className="p-4">
                                        <Link 
                                            to={`/mypost/${post.$id}`}
                                            className="text-gray-200 font-semibold mb-1 group-hover:text-violet-400 transition"
                                        >
                                            {post.title}
                                        </Link>
                                        <div className="flex items-center gap-2 text-xs text-gray-600">
                                            <span>{new Date(post.$createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Scrollbar Styles */}
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #1a1a1a;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #333;
                    border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #444;
                }
            `}</style>
        </div>
    );
};

export default ViewUser;