import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { fetchPostsRequest, searchPostsRequest, clearSearchResults } from '../../store/slices/postsSlice';
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
  const dispatch = useDispatch();
  const { posts, searchResults, loading, searchLoading, pagination } = useSelector((state) => state.posts);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const debouncedSearch = debounce((query) => {
    if (query.trim()) {
      dispatch(searchPostsRequest({ query }));
    } else {
      dispatch(clearSearchResults());
    }
  }, 500);

  useEffect(() => {
    dispatch(fetchPostsRequest({ skip: 0, limit: 12 }));
  }, [dispatch]);

  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery, debouncedSearch]);

  const handleLoadMore = () => {
    const nextSkip = (currentPage + 1) * 12;
    dispatch(fetchPostsRequest({ skip: nextSkip, limit: 12 }));
    setCurrentPage(currentPage + 1);
  };

  const displayPosts = searchQuery.trim() ? searchResults : posts;
  const isLoading = searchQuery.trim() ? searchLoading : loading;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog Posts</h1>
          <p className="text-xl text-gray-600 mb-8">
            Explore our collection of articles, tutorials, and insights.
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
          emptyMessage={searchQuery.trim() ? "No posts found for your search" : "No posts available"}
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
