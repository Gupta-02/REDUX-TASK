import { useState } from 'react';
import ProtectedRoute from '../../components/ProtectedRoute';
import Navbar from '../../components/Navbar';
import Button from '../../components/Button';

export default function CreateBlog() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await fetch('https://dummyjson.com/posts/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, body }),
      });
      if (!res.ok) throw new Error('Failed to create post');
      setSuccess(true);
      setTitle('');
      setBody('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <Navbar />
      <div className="max-w-lg mx-auto mt-8 p-4 bg-white rounded shadow">
        <h1 className="text-xl font-bold mb-4">Create New Blog Post</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            className="w-full mb-2 p-2 border rounded"
          />
          <textarea
            placeholder="Body"
            value={body}
            onChange={e => setBody(e.target.value)}
            required
            className="w-full mb-2 p-2 border rounded"
            rows={6}
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Post'}
          </Button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">Post created successfully!</p>}
      </div>
    </ProtectedRoute>
  );
}