import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserPostsRequest, deletePostRequest } from '../../../store/slices/postsSlice';
import Navbar from '../../../components/Navbar/Navbar';
import Card from '../../../components/Card/Card';
import Button from '../../../components/Button/Button';
import Loader from '../../../components/Loader/Loader';
import Link from 'next/link';

export default function DashboardPostsPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { userPosts, loading } = useSelector((state) => state.posts);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    
    if (user?.id) {
      dispatch(fetchUserPostsRequest({ userId: user.id }));
    }
  }, [isAuthenticated, user, router, dispatch]);

  const handleDelete = async (postId) => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        dispatch(deletePostRequest({ id: postId }));
      } catch (error) {
        console.error("Failed to delete post:", error);
      }
    }
  };

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">My Posts</h1>
            <Link href="/dashboard/posts/new">
              <Button>
                ➕ New Post
              </Button>
            </Link>
          </div>

          {/* Posts List */}
          {loading ? (
            <Loader size="lg" className="py-12" />
          ) : userPosts.length === 0 ? (
            <Card className="text-center py-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                No posts yet
              </h2>
              <p className="text-gray-600 mb-6">
                Start writing your first blog post to share your thoughts with the world.
              </p>
              <Link href="/dashboard/posts/new">
                <Button>Write Your First Post</Button>
              </Link>
            </Card>
          ) : (
            <div className="space-y-4">
              {userPosts.map((post) => (
                <Card key={post.id}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {post.title}
                        </h3>
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          Published
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {post.body?.substring(0, 200)}...
                      </p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{post.views || Math.floor(Math.random() * 1000)} views</span>
                        <span>•</span>
                        <span>{post.reactions?.likes || 0} likes</span>
                        <span>•</span>
                        <span>{new Date().toLocaleDateString()}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-3">
                        {post.tags?.map((tag) => (
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
                      <Link href={`/blog/${post.id}`}>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </Link>
                      <Link href={`/dashboard/posts/edit/${post.id}`}>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(post.id)}
                        className="text-red-600 hover:text-red-700 hover:border-red-300"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
