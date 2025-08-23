import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPostRequest, updatePostRequest } from '../../../../store/slices/postsSlice';
import Navbar from '../../../../components/Navbar/Navbar';
import Card from '../../../../components/Card/Card';
import Button from '../../../../components/Button/Button';
import Loader from '../../../../components/Loader/Loader';

export default function EditPostPage() {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { currentPost, loading } = useSelector((state) => state.posts);
  
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    tags: '',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    
    if (id) {
      dispatch(fetchPostRequest({ id }));
    }
  }, [isAuthenticated, id, router, dispatch]);

  useEffect(() => {
    if (currentPost) {
      setFormData({
        title: currentPost.title || '',
        body: currentPost.body || '',
        tags: currentPost.tags?.join(', ') || '',
      });
    }
  }, [currentPost]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.body.trim()) return;

    const postData = {
      id: id,
      title: formData.title.trim(),
      body: formData.body.trim(),
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      userId: user?.id || currentPost?.userId,
    };

    dispatch(updatePostRequest(postData));
    
    // Navigate back to posts list after a short delay
    setTimeout(() => {
      router.push('/dashboard/posts');
    }, 1000);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  if (loading || !currentPost) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Loader size="lg" className="py-20" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Post</h1>
          <Button
            variant="outline"
            onClick={() => router.push('/dashboard/posts')}
          >
            Cancel
          </Button>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your post title..."
                required
              />
            </div>

            {/* Body */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content *
              </label>
              <textarea
                value={formData.body}
                onChange={(e) => handleChange("body", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={15}
                placeholder="Write your post content here..."
                required
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => handleChange("tags", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="react, javascript, tutorial (comma-separated)"
              />
              <p className="text-sm text-gray-500 mt-1">
                Separate tags with commas
              </p>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/dashboard/posts')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!formData.title.trim() || !formData.body.trim() || loading}
                loading={loading}
              >
                Update Post
              </Button>
            </div>
          </Card>
        </form>
      </div>
    </div>
  );
}
