import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar/Navbar';
import ItemList from '../components/ItemList/ItemList';
import Button from '../components/Button/Button';
import Card from '../components/Card/Card';

const PostCard = ({ post }) => (
  <Card className="hover:shadow-md transition-shadow">
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
          <span>By User {post.userId}</span>
          <span>•</span>
          <span>{post.reactions?.likes || 0} likes</span>
          <span>•</span>
          <span>{post.views || Math.floor(Math.random() * 1000)} views</span>
        </div>
      </div>

      <p className="text-gray-600 line-clamp-3">{post.body?.substring(0, 150)}...</p>

      <div className="flex flex-wrap gap-2">
        {post.tags?.map((tag) => (
          <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">#{tag}</span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span>❤️ {post.reactions?.likes || 0}</span>
          <span>👁️ {post.views || Math.floor(Math.random() * 1000)}</span>
        </div>
        <Link href={`/blog/${post.id}`}>
          <Button variant="outline" size="sm">Read More</Button>
        </Link>
      </div>
    </div>
  </Card>
);

export default function FetchPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    const fetchPosts = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('https://dummyjson.com/posts');
        if (!res.ok) throw new Error(`Network error: ${res.status}`);
        const data = await res.json();
        if (!cancelled) {
          if (data && Array.isArray(data.posts)) {
            setPosts(data.posts);
          } else {
            setError('Unexpected response format');
          }
        }
      } catch (err) {
        if (!cancelled) setError(err.message || 'Failed to fetch posts');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchPosts();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Fetched Posts</h1>
          <div className="flex space-x-4">
            <Link href="/">
              <Button variant="outline">Home</Button>
            </Link>
            <Link href="/blog">
              <Button variant="outline">Blog</Button>
            </Link>
          </div>
        </div>

        {error && <div className="text-red-600 p-4 bg-red-50 rounded mb-4">{error}</div>}

        <ItemList
          items={posts}
          loading={loading}
          renderItem={(post) => <PostCard key={post.id} post={post} />}
          emptyMessage={error ? 'Error loading posts' : 'No posts available'}
        />
      </div>
    </div>
  );
}
