import { Link } from "react-router-dom";
import { useEffect , useContext } from "react";
import ViewUser from "./ViewUser.jsx";
import { DataContext } from "../../context/DataContext.jsx"

const Home = () => {

  const { allposts , fetchallposts , isViewingUser , setisViewingUser , setviewingUserId , fetchViewUser  } = useContext(DataContext)

  useEffect(() => {
    fetchallposts()
  },[])

  const handleViewUser = async (userId) => {
    setviewingUserId(userId)
    setisViewingUser(true)
    await fetchViewUser(userId)
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-gray-300 py-[0.1px]">
      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-10 mt-22">
        <div className="space-y-16">
          {allposts?.rows?.map((post) => (
            <article key={post?.$id} className="group">
              {/* Post Image */}
              <div className="relative overflow-hidden rounded-xl mb-6">
                <img 
                  src={post?.image_url} 
                  alt={post?.title}
                  className="w-full h-auto max-h-[500px] object-cover group-hover:scale-[1.02] transition duration-500"
                />
              </div>

              {/* Post Title */}
              <h2 className="text-2xl md:text-3xl font-bold text-gray-100 mb-4 group-hover:text-gray-300 transition cursor-pointer">
                {post?.title}
              </h2>

              {/* Author & Date */}
              <div className="flex items-center gap-3 mb-5">
                { post?.author_image ? <img className="w-10 h-10 rounded-full object-cover" src={post?.author_image} alt={post?.author_name} /> : <span>{post?.author_name[0].toUpperCase()}</span>}
                <div className="text-sm">
                  <span className="text-gray-400">by </span>
                  <p onClick={() => {
                    handleViewUser(post?.userId);
                  }} className="text-[#8e76d6] cursor-pointer inline-block font-semibold hover:underline">
                    {post?.author_name}
                  </p>
                  <span className="text-gray-400"> on {new Date(post?.$createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Footer: Read More */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <Link 
                  to={`/mypost/${post.$id}`}
                  className="inline-flex items-center gap-2 text-[#a698d2] font-medium hover:underline group/link"
                >
                  Read article
                  <svg 
                    className="w-4 h-4 group-hover/link:translate-x-1 transition" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>

      <div className="max-w-5xl mx-auto flex justify-center items-center p-4 mt-2">
        <Link to={"/post"} className="px-12 py-3 bg-purple-700 cursor-pointer rounded-full">Publish Blog</Link>
      </div>

      {isViewingUser && <ViewUser />}
    </div>
  );
};

export default Home;