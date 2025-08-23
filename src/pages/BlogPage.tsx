import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Link } from "react-router-dom";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const posts = useQuery(api.posts.searchPosts, { query: searchQuery });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          All Blog Posts
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover amazing stories, insights, and ideas from our community of writers.
        </p>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto mb-12">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400">🔍</span>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Search posts..."
          />
        </div>
      </div>

      {/* Posts Grid */}
      {posts === undefined ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3 mb-4"></div>
              <div className="flex space-x-2">
                <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                <div className="h-6 bg-gray-200 rounded-full w-20"></div>
              </div>
            </div>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {searchQuery ? "No posts found" : "No posts yet"}
          </h3>
          <p className="text-gray-600 mb-6">
            {searchQuery 
              ? `No posts match "${searchQuery}". Try a different search term.`
              : "Be the first to share your story with the community!"
            }
          </p>
          {!searchQuery && (
            <Link
              to="/dashboard/posts/new"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            >
              Write First Post
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post._id}
              to={`/blog/${post._id}`}
              className="group bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 hover:border-blue-200"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {post.excerpt || post.content.substring(0, 150) + "..."}
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                <span>By {post.author?.name || "Anonymous"}</span>
                <div className="flex items-center space-x-4">
                  <span>👁 {post.views}</span>
                  <span>❤️ {post.likes}</span>
                </div>
              </div>
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
