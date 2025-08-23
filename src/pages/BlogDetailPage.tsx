import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

export default function BlogDetailPage() {
  const { id } = useParams<{ id: string }>();
  const post = useQuery(api.posts.getPost, { id: id as Id<"posts"> });
  const incrementViews = useMutation(api.posts.incrementViews);
  const toggleLike = useMutation(api.posts.toggleLike);

  useEffect(() => {
    if (post && id) {
      incrementViews({ id: id as Id<"posts"> });
    }
  }, [post, id, incrementViews]);

  const handleLike = () => {
    if (id) {
      toggleLike({ id: id as Id<"posts"> });
    }
  };

  if (post === undefined) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (post === null) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="text-6xl mb-4">📄</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Post Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          The post you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to="/blog"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
        >
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Button */}
      <Link
        to="/blog"
        className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 transition-colors"
      >
        ← Back to Blog
      </Link>

      {/* Post Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {post.title}
        </h1>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
          <div className="flex items-center space-x-4">
            <span>By {post.author?.name || "Anonymous"}</span>
            <span>•</span>
            <span>{new Date(post._creationTime).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>👁 {post.views}</span>
            <button
              onClick={handleLike}
              className="flex items-center space-x-1 text-red-500 hover:text-red-600 transition-colors"
            >
              <span>❤️</span>
              <span>{post.likes}</span>
            </button>
          </div>
        </div>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Post Content */}
      <article className="prose prose-lg max-w-none mb-12">
        <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
          {post.content}
        </div>
      </article>

      {/* Post Actions */}
      <div className="border-t border-gray-200 pt-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            >
              ❤️ Like ({post.likes})
            </button>
            <span className="text-sm text-gray-500">
              👁 {post.views} views
            </span>
          </div>
          
          <Link
            to="/blog"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
          >
            Read More Posts
          </Link>
        </div>
      </div>
    </div>
  );
}
