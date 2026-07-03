import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import ViewUser from "./ViewUser.jsx";

const Post = () => {
  const { fetchpost , post, isViewingUser , setisViewingUser , setviewingUserId , fetchViewUser } = useContext(DataContext);
  const pId = useParams()

  const handleViewUser = async (userId) => {
    setviewingUserId(userId)
    setisViewingUser(true)
    await fetchViewUser(userId)
  }

  useEffect(() => {
    fetchpost(pId.id)
  },[])

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-gray-300 py-[0.1px]">
      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 mt-28">
        {/* Post Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-100 leading-tight mb-6">
            {post?.title}
          </h1>

          <div className="flex items-center gap-4">
            <img
              src={post?.author_image}
              alt={post?.author_name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p onClick={() => handleViewUser(post?.userId)} className="text-[#5eead4] font-semibold hover:underline cursor-pointer">
               @{post?.author_name}
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-0.5">
                <span>{new Date(post?.$createdAt).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-xl overflow-hidden mb-10">
          <img
            src={post?.image_url}
            alt={post?.title}
            className="w-full h-auto max-h-[500px] object-cover"
          />
        </div>

        {/* Post Content */}
        <article className="prose prose-invert prose-lg max-w-none mb-12" dangerouslySetInnerHTML={{ __html: post?.content }} />
      </main>
      {isViewingUser && <ViewUser />}
    </div>
  );
};

export default Post;