import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronDown, Plus, Eye, Trash2 } from "lucide-react";

const Blogpost = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("Latest blogs");
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const API_URL = "http://gography.website:3004";

  // Fetch blog posts from API
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/blogposts`);
        if (!response.ok) throw new Error("Failed to fetch blog posts");
        const data = await response.json();
        setBlogPosts(data.blogPosts);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleNewPost = () => {
    navigate("/admin/add-post");
  };

  const handleDeletePost = async (postId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (confirmDelete) {
      try {
        const response = await fetch(`${API_URL}/api/blogposts/${postId}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete post");
        setBlogPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
        alert("Post deleted successfully");
      } catch (error) {
        console.error("Error deleting post:", error);
        alert("Failed to delete post. Please try again.");
      }
    }
  };

  const filteredPosts = blogPosts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Error: {error}. Please try again later.
      </div>
    );
  }

  return (
    <div className="p-6 font-prompt bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Blogs</h1>
        <button
          className="bg-green-500 text-white px-5 py-2 rounded-lg flex items-center hover:bg-green-600 shadow-md"
          onClick={handleNewPost}
        >
          <Plus size={16} className="mr-2" /> New post
        </button>
      </div>

      {/* Search & Sort */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <div className="relative w-full md:w-1/2">
          <Search size={18} className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full bg-white border border-gray-300 rounded-lg px-10 py-3 focus:outline-none shadow-sm"
          />
        </div>
        <div className="relative">
          <button className="bg-white border border-gray-300 rounded-lg px-5 py-3 flex items-center text-gray-600 shadow-sm hover:bg-gray-100">
            {sortOption} <ChevronDown size={18} className="ml-2" />
          </button>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300"
          >
            <img
              src={post.image ? API_URL + post.image : `https://via.placeholder.com/400x300?text=No+Image`}
              alt={post.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <p className="text-sm text-gray-500 mb-2">{post.date}</p>
              <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
                {post.title}
              </h2>
              <div className="flex items-center justify-between text-gray-500 mt-2">
                <div className="flex items-center">
                  <Eye size={18} className="mr-1" />
                  <span>{post.views} views</span>
                </div>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDeletePost(post.id)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Blogs Found */}
      {filteredPosts.length === 0 && (
        <p className="text-gray-500 text-center mt-8 text-lg">
          No blogs found. Please try searching with a different term.
        </p>
      )}
    </div>
  );
};

export default Blogpost;