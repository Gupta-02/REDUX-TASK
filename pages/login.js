import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest, clearError } from '../store/slices/authSlice';
import Navbar from '../components/Navbar/Navbar';
import Card from '../components/Card/Card';
import Button from '../components/Button/Button';

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    // Clear any previous errors when component mounts
    dispatch(clearError());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginRequest(formData));
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <Card className="max-w-md w-full text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome back!
            </h2>
            <p className="text-gray-600 mb-6">
              You're already signed in. Ready to start writing?
            </p>
            <Button onClick={() => router.push('/dashboard')} className="w-full">
              Go to Dashboard
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-gray-600">
              Start writing and sharing your stories
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>

            <Button
              type="submit"
              loading={loading}
              disabled={loading || !formData.username || !formData.password}
              className="w-full"
            >
              Sign In
            </Button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Demo credentials: <br />
              Username: <code className="bg-gray-100 px-1 rounded">kminchelle</code> <br />
              Password: <code className="bg-gray-100 px-1 rounded">0lelplR</code>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
