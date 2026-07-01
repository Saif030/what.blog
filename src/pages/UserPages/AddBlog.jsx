import { useState } from "react";
import { dbPostUpload } from "../../utils/dbUpload";
import { Editor } from '@tinymce/tinymce-react';
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
  });

  const navigate = useNavigate()

  const tiny_api = import.meta.env.VITE_TINY_MCE

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dbPostUpload(formData)
    setFormData({
      title: "",
      content: "",
      image: ""
    })
    navigate("/home")
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-gray-300 py-[0.1px]">
      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-12 mt-18">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-100 mb-2">Create New Post</h1>
          <p className="text-gray-500">Share your thoughts about our amazing planet.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Post Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter your post title..."
              required
              className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-600 focus:outline-none focus:border-[#5eead4] focus:ring-1 focus:ring-[#5eead4] transition"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Featured Image URL
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-600 focus:outline-none focus:border-[#5eead4] focus:ring-1 focus:ring-[#5eead4] transition"
            />
            {formData.image && (
              <div className="mt-3 rounded-lg overflow-hidden border border-gray-800">
                <img 
                  src={formData.image} 
                  alt="Preview" 
                  className="w-full h-48 object-cover"
                  onError={(e) => e.target.style.display = "none"}
                />
              </div>
            )}
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Post Content
            </label>
            <Editor
              name="content"
              value={formData.content}
              initialValue="Write your full blog post here..."
              onEditorChange={(value) => setFormData({...formData , content:value})}
              apiKey={tiny_api}
              init={{
                height: 500,
                menubar: true,
                plugins: [
                  "lists",
                  "link",
                  "image",
                  "table",
                  "code",
                  "fullscreen",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | bold italic underline | alignleft aligncenter alignright | bullist numlist | image link | table | code fullscreen",
                placeholder: "Write your article...",
                branding: false,
                statusbar: true,
                resize: true,
                content_style:
                  "body { font-family: Helvetica, Arial, sans-serif; font-size: 16px; }",
              }}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-purple-700 text-white px-8 py-3 rounded-full hover:bg-purple-900 cursor-pointer transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Publishing...
                </>
              ) : (
                "Publish Post"
              )}
            </button>
            
            <button
              type="button"
              onClick={() => setFormData({
                title: "",
                content: "",
                author: "",
                image: ""
              })}
              className="px-6 py-3 rounded-full border cursor-pointer border-gray-700 text-gray-400 hover:text-gray-200 hover:border-gray-600 transition"
            >
              Clear
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddBlog;