import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { debounce } from '../../utils/helpers';
import Navbar from '../../components/Navbar/Navbar';
import Button from '../../components/Button/Button';
import ItemList from '../../components/ItemList/ItemList';
import Card from '../../components/Card/Card';

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

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [pagination, setPagination] = useState({ total: 0, skip: 0, limit: 12 });

  const fetchPosts = useCallback(async (skip = 0, limit = 12) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`https://dummyjson.com/posts?skip=${skip}&limit=${limit}`);
      if (!res.ok) throw new Error(`Network error: ${res.status}`);
      const data = await res.json();
      if (data && Array.isArray(data.posts)) {
        // On first page replace, otherwise append
        if (skip === 0) setPosts(data.posts || []);
        else setPosts(prev => [...prev, ...(data.posts || [])]);
        setPagination({ total: data.total || 0, skip: data.skip || skip, limit: data.limit || limit });
      } else {
        setError('Invalid response from server');
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  }, []);

  // initial load
  useEffect(() => {
    fetchPosts(0, pagination.limit);
  }, [fetchPosts]);

  // debounced search using DummyJSON search endpoint
  const debouncedSearch = useCallback(debounce(async (q) => {
    if (!q.trim()) {
      setSearchResults([]);
      setSearchLoading(false);
      return;
    }
    setSearchLoading(true);
    try {
      const res = await fetch(`https://dummyjson.com/posts/search?q=${encodeURIComponent(q)}`);
      if (!res.ok) throw new Error(`Network error: ${res.status}`);
      const data = await res.json();
      setSearchResults(data.posts || []);
    } catch (err) {
      console.error('Search error', err);
    } finally {
      setSearchLoading(false);
    }
  }, 400), []);

  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery, debouncedSearch]);

  const handleLoadMore = async () => {
    const nextSkip = posts.length;
    if (posts.length >= pagination.total) return;
    await fetchPosts(nextSkip, pagination.limit);
  };

  const displayPosts = searchQuery.trim() ? searchResults : posts;
  const isLoading = searchQuery.trim() ? searchLoading : loading;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">All Blog Posts</h1>
          <p className="text-xl text-gray-600 mb-8">
            Discover amazing stories, insights, and ideas from our community of writers.
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Posts */}
        <ItemList 
          items={displayPosts} 
          loading={isLoading}
          renderItem={(post) => <PostCard key={post.id} post={post} />}
          emptyMessage={searchQuery.trim() ? "No posts found for your search" : (error || "No posts available")}
        />

        {/* Load More */}
        {!searchQuery.trim() && posts.length > 0 && posts.length < pagination.total && (
          <div className="text-center mt-12">
            <Button
              onClick={handleLoadMore}
              variant="outline"
              loading={loading}
            >
              Load More Posts
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
