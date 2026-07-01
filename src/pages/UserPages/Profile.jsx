import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext.jsx";
import DotSpinner from "../../components/DotSpinner.jsx"
import { Link } from "react-router-dom";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { userData , updateUser , userPosts , fetchUser , deletePost ,setIspostEditing } = useContext(DataContext)
  const [isloading , setisloading] = useState(false)

  const [profile, setProfile] = useState({
    username: userData?.username,
    bio: userData?.bio,
    email: userData?.email,
    avatar: userData?.profile_pic
  });

  const [formData, setFormData] = useState({
    username: userData?.username,
    bio: userData?.bio,
    profile_pic: userData?.profile_pic
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setisloading(true)
    await updateUser(formData)
    setIsEditing(false);
    await fetchUser()
    setisloading(false)
  };

  const handleCancel = () => {
    setFormData({ ...profile });
    setIsEditing(false);
  };

  if (isloading) {
    return (
      <div className='w-full h-screen flex items-center justify-center'>
        <DotSpinner />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-gray-300 py-[0.1px]">
      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-12 mt-22">
        {/* Profile Card */}
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-8 mb-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <img
                src={isEditing ? formData.profile_pic : profile.avatar}
                alt={profile.username}
                className="w-28 h-28 rounded-full object-cover border-2 border-gray-700"
              />
            </div>

            {/* Info */}
            <div className="flex-1 w-full">
              {!isEditing ? (
                <>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-100">@{profile.username}</h1>
                      <p className="text-gray-500 text-sm mt-1">{profile.email}</p>
                    </div>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-700 text-gray-300 hover:border-[#5eead4] hover:text-[#5eead4] transition text-sm font-medium"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                      Edit Profile
                    </button>
                  </div>

                  <p className="text-gray-400 leading-relaxed mb-6 max-w-2xl">
                    {profile.bio}
                  </p>

                  {/* Stats */}
                  <div className="flex gap-8 pt-6 border-t border-gray-800">
                    <div>
                      <div className="text-xl font-bold text-gray-100">
                        {userPosts?.total}
                      </div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide mt-1">
                        Total Posts
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Username
                      </label>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full bg-[#0f0f0f] border border-gray-700 rounded-lg px-4 py-2.5 text-gray-100 focus:outline-none focus:border-[#5eead4] focus:ring-1 focus:ring-[#5eead4] transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Bio
                      </label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows={3}
                        className="w-full bg-[#0f0f0f] border border-gray-700 rounded-lg px-4 py-2.5 text-gray-100 focus:outline-none focus:border-[#5eead4] focus:ring-1 focus:ring-[#5eead4] transition resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Profile Picture URL
                      </label>
                      <input
                        type="text"
                        name="profile_pic"
                        value={formData.profile_pic}
                        onChange={handleChange}
                        placeholder="https://example.com/avatar.jpg"
                        className="w-full bg-[#0f0f0f] border border-gray-700 rounded-lg px-4 py-2.5 text-gray-100 placeholder-gray-600 focus:outline-none focus:border-[#5eead4] focus:ring-1 focus:ring-[#5eead4] transition"
                      />
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button
                        onClick={handleSave}
                        className="bg-[#744af3] cursor-pointer text-white px-6 py-2.5 rounded-full font-semibold hover:bg-[#612FFA] transition"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-6 py-2.5 rounded-full cursor-pointer border border-gray-700 text-gray-400 hover:text-gray-200 hover:border-gray-600 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* User Posts */}
        <div>
          <h2 className="text-2xl font-bold text-gray-100 mb-6 flex items-center gap-3">
            <span className="w-1 h-6 bg-[#612FFA] rounded-full"></span>
            My Posts
          </h2>

          <div className="space-y-6">
            {userPosts?.rows?.map((post) => (
              <div
                key={post.$id}
                className="flex flex-col cursor-pointer sm:flex-row gap-6 bg-[#1a1a1a] border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition group"
              >
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="w-full sm:w-48 h-32 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <Link to={`/mypost/${post.$id}`} className="text-lg font-bold text-gray-100 group-hover:text-[#8271b3] transition mb-2">
                      {post.title}
                    </Link>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span>{new Date(post?.$createdAt).toLocaleString()}</span>
                    </div>
                    </div>
                  <div className="flex gap-3 mt-4 sm:mt-0">
                    <button onClick={() => deletePost(post.$id)} className="text-sm text-gray-500 hover:text-red-400 transition flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <div className="max-w-5xl mx-auto flex justify-center items-center p-4 mt-2">
        <Link to={"/post"} className="px-12 py-3 bg-purple-700 cursor-pointer rounded-full">Publish Blog</Link>
      </div>
    </div>
  );
};

export default Profile;