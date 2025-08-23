import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Link } from "react-router-dom";

export default function HomePage() {
  const posts = useQuery(api.posts.getAllPosts);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            BlogCraft
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Discover amazing stories, insights, and ideas from our community of writers.
          Share your thoughts and connect with readers around the world.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/blog"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Explore Posts
          </Link>
          <Link
            to="/dashboard/posts/new"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Start Writing
          </Link>
        </div>
      </div>

      {/* Featured Posts */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Latest Posts
        </h2>
        
        {posts === undefined ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
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
              No posts yet
            </h3>
            <p className="text-gray-600 mb-6">
              Be the first to share your story with the community!
            </p>
            <Link
              to="/dashboard/posts/new"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            >
              Write First Post
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(0, 6).map((post) => (
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
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>By {post.author?.name || "Anonymous"}</span>
                  <div className="flex items-center space-x-4">
                    <span>👁 {post.views}</span>
                    <span>❤️ {post.likes}</span>
                  </div>
                </div>
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
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

      {/* Features Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Why Choose BlogCraft?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-4">✍️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Easy Writing
            </h3>
            <p className="text-gray-600">
              Simple and intuitive editor to help you focus on your content.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🌐</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Global Reach
            </h3>
            <p className="text-gray-600">
              Share your stories with readers from around the world.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Community
            </h3>
            <p className="text-gray-600">
              Engage with other writers and build meaningful connections.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
