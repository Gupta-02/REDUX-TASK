import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Link } from "react-router-dom";
import { Id } from "../../convex/_generated/dataModel";

export default function DashboardPostsPage() {
  const userPosts = useQuery(api.posts.getUserPosts);
  const deletePost = useMutation(api.posts.deletePost);

  const handleDelete = async (postId: Id<"posts">) => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost({ id: postId });
      } catch (error) {
        console.error("Failed to delete post:", error);
      }
    }
  };

  if (userPosts === undefined) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">My Posts</h1>
          <Link
            to="/dashboard/posts/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
          >
            ➕ New Post
          </Link>
        </div>

        {/* Posts List */}
        {userPosts.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-12 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              No posts yet
            </h2>
            <p className="text-gray-600 mb-6">
              Start writing your first blog post to share your thoughts with the world.
            </p>
            <Link
              to="/dashboard/posts/new"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            >
              Write Your First Post
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {userPosts.map((post) => (
              <div key={post._id} className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {post.title}
                      </h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        post.published 
                          ? "bg-green-100 text-green-800" 
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {post.published ? "Published" : "Draft"}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {post.content.substring(0, 200)}...
                    </p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{post.views} views</span>
                      <span>•</span>
                      <span>{post.likes} likes</span>
                      <span>•</span>
                      <span>{new Date(post._creationTime).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-3">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2 ml-4">
                    <Link
                      to={`/blog/${post._id}`}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="inline-flex items-center px-3 py-1.5 border border-red-300 text-sm font-medium rounded-lg text-red-600 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
