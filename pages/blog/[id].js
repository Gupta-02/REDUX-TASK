import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostRequest } from '../../store/slices/postsSlice';
import Navbar from '../../components/Navbar/Navbar';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import Loader from '../../components/Loader/Loader';

export default function BlogDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { currentPost, loading } = useSelector((state) => state.posts);
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    if (id) {
      dispatch(fetchPostRequest({ id }));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (currentPost) {
      setLikeCount(currentPost.reactions?.likes || 0);
    }
  }, [currentPost]);

  const handleLike = () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Loader size="lg" className="py-20" />
        </div>
      </div>
    );
  }

  if (!currentPost) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
            <p className="text-gray-600 mb-6">
              The blog post you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => router.push('/blog')}>
              Back to Blog
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => router.push('/blog')}
          className="mb-6"
        >
          ← Back to Blog
        </Button>

        {/* Post Content */}
        <Card className="mb-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {currentPost.title}
            </h1>
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
              <span>By User {currentPost.userId}</span>
              <span>•</span>
              <span>{new Date().toLocaleDateString()}</span>
              <span>•</span>
              <span>{Math.floor(Math.random() * 1000)} views</span>
            </div>
            
            {/* Tags */}
            {currentPost.tags && (
              <div className="flex flex-wrap gap-2 mb-6">
                {currentPost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="prose max-w-none mb-8">
            <div className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
              {currentPost.body}
            </div>
          </div>

          {/* Actions */}
          <div className="border-t pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={handleLike}
                  className={`flex items-center space-x-2 ${liked ? 'text-red-600 border-red-300' : ''}`}
                >
                  <span>{liked ? '❤️' : '🤍'}</span>
                  <span>{likeCount}</span>
                </Button>
                <span className="text-gray-500">
                  👁️ {Math.floor(Math.random() * 1000)} views
                </span>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  Share
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Comments Section */}
        <Card>
          <h3 className="text-xl font-semibold mb-6">
            Comments (0)
          </h3>
          
          {isAuthenticated ? (
            <CommentForm />
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">Sign in to leave a comment</p>
              <Button onClick={() => router.push('/login')}>
                Sign In
              </Button>
            </div>
          )}

          <div className="mt-6">
            <p className="text-gray-500 text-center py-8">No comments yet. Be the first to comment!</p>
          </div>
        </Card>
      </div>
    </div>
  );
}

function CommentForm() {
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setIsSubmitting(true);
    // Simulate comment submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    setComment('');
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a comment..."
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        rows={3}
      />
      <div className="mt-2 flex justify-end">
        <Button
          type="submit"
          disabled={!comment.trim() || isSubmitting}
          loading={isSubmitting}
        >
          Post Comment
        </Button>
      </div>
    </form>
  );
}
