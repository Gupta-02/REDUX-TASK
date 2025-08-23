import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { fetchPostsRequest } from '../store/slices/postsSlice';
import Navbar from '../components/Navbar/Navbar';
import Button from '../components/Button/Button';
import ItemList from '../components/ItemList/ItemList';
import Card from '../components/Card/Card';

const PostCard = ({ post }) => (
  <Card className="hover:shadow-md transition-shadow">
    <div className="space-y-4">
      <div>
        <Link href={`/blog/${post.id}`}>
          <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer">
            {post.title}
          </h3>
        </Link>
        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
          <span>By User {post.userId}</span>
          <span>•</span>
          <span>{post.reactions?.likes || 0} likes</span>
          <span>•</span>
          <span>{post.views || Math.floor(Math.random() * 1000)} views</span>
        </div>
      </div>

      <p className="text-gray-600 line-clamp-3">
        {post.body?.substring(0, 150)}...
      </p>

      <div className="flex flex-wrap gap-2">
        {post.tags?.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span>❤️ {post.reactions?.likes || 0}</span>
          <span>👁️ {post.views || Math.floor(Math.random() * 1000)}</span>
        </div>
        <Link href={`/blog/${post.id}`}>
          <Button variant="outline" size="sm">
            Read More
          </Button>
        </Link>
      </div>
    </div>
  </Card>
);

export default function HomePage() {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPostsRequest({ skip: 0, limit: 6 }));
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-blue-600">BlogApp</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover amazing stories, insights, and ideas from our community of writers.
            Share your thoughts and connect with readers worldwide.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/blog">
              <Button size="lg">Explore Posts</Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg">Start Writing</Button>
            </Link>
          </div>
        </div>

        {/* Featured Posts */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Latest Posts</h2>
            <Link href="/blog">
              <Button variant="outline">View All Posts</Button>
            </Link>
          </div>
          
          <ItemList 
            items={posts.slice(0, 6)} 
            loading={loading}
            renderItem={(post) => <PostCard key={post.id} post={post} />}
            emptyMessage="No posts available"
          />
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="text-4xl mb-4">✍️</div>
            <h3 className="text-xl font-semibold mb-2">Easy Writing</h3>
            <p className="text-gray-600">
              Create and publish your posts with our intuitive editor.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🌐</div>
            <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
            <p className="text-gray-600">
              Share your ideas with readers from around the world.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-semibold mb-2">Engage</h3>
            <p className="text-gray-600">
              Connect with your audience through comments and reactions.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">BlogApp</h3>
              <p className="text-gray-400 mb-4">
                A modern blog platform built with Next.js, Redux, and Redux-Saga.
                Share your thoughts and connect with readers worldwide.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>hello@blogapp.com</li>
                <li>+1 (555) 123-4567</li>
                <li>123 Blog Street</li>
                <li>Tech City, TC 12345</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 BlogApp. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
