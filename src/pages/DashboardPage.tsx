import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  const user = useQuery(api.auth.loggedInUser);
  const userPosts = useQuery(api.posts.getUserPosts);

  if (user === undefined || userPosts === undefined) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const stats = {
    totalPosts: userPosts.length,
    totalViews: userPosts.reduce((sum, post) => sum + post.views, 0),
    totalLikes: userPosts.reduce((sum, post) => sum + post.likes, 0),
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name || "Writer"}!
          </h1>
          <p className="text-gray-600">
            Here's an overview of your blog activity.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {stats.totalPosts}
              </div>
              <div className="text-gray-600">Total Posts</div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {stats.totalViews}
              </div>
              <div className="text-gray-600">Total Views</div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-500 mb-2">
                {stats.totalLikes}
              </div>
              <div className="text-gray-600">Total Likes</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/dashboard/posts/new"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            >
              ✍️ Write New Post
            </Link>
            <Link
              to="/dashboard/posts"
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            >
              📝 Manage Posts
            </Link>
            <Link
              to="/blog"
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            >
              🌐 View Blog
            </Link>
          </div>
        </div>

        {/* Recent Posts */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Your Recent Posts</h2>
            <Link
              to="/dashboard/posts"
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            >
              View All
            </Link>
          </div>
          
          {userPosts.length > 0 ? (
            <div className="space-y-4">
              {userPosts.slice(0, 3).map((post) => (
                <div key={post._id} className="border-l-4 border-blue-600 pl-4">
                  <h3 className="font-medium text-gray-900">{post.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {post.views} views • {post.likes} likes
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(post._creationTime).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">You haven't written any posts yet.</p>
              <Link
                to="/dashboard/posts/new"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
              >
                Write Your First Post
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
