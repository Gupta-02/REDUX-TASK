import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserPostsRequest } from '../../store/slices/postsSlice';
import Navbar from '../../components/Navbar/Navbar';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Link from 'next/link';

export default function DashboardPage() {
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

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  const stats = {
    totalPosts: userPosts.length,
    totalViews: userPosts.reduce((sum, post) => sum + (post.views || Math.floor(Math.random() * 1000)), 0),
    totalLikes: userPosts.reduce((sum, post) => sum + (post.reactions?.likes || 0), 0),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.firstName || user?.username || "Writer"}!
            </h1>
            <p className="text-gray-600">
              Here's an overview of your blog activity.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {stats.totalPosts}
                </div>
                <div className="text-gray-600">Total Posts</div>
              </div>
            </Card>
            
            <Card>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {stats.totalViews}
                </div>
                <div className="text-gray-600">Total Views</div>
              </div>
            </Card>
            
            <Card>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500 mb-2">
                  {stats.totalLikes}
                </div>
                <div className="text-gray-600">Total Likes</div>
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="flex flex-wrap gap-4">
              <Link href="/dashboard/posts/new">
                <Button>
                  ✍️ Write New Post
                </Button>
              </Link>
              <Link href="/dashboard/posts">
                <Button variant="outline">
                  📝 Manage Posts
                </Button>
              </Link>
              <Link href="/blog">
                <Button variant="outline">
                  🌐 View Blog
                </Button>
              </Link>
            </div>
          </Card>

          {/* Recent Posts */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Your Recent Posts</h2>
              <Link href="/dashboard/posts">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </div>
            
            {userPosts.length > 0 ? (
              <div className="space-y-4">
                {userPosts.slice(0, 3).map((post) => (
                  <div key={post.id} className="border-l-4 border-blue-600 pl-4">
                    <h3 className="font-medium text-gray-900">{post.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {post.views || Math.floor(Math.random() * 1000)} views • {post.reactions?.likes || 0} likes
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date().toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">You haven't written any posts yet.</p>
                <Link href="/dashboard/posts/new">
                  <Button>Write Your First Post</Button>
                </Link>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
