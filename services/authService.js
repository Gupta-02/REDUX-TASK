import axios from 'axios';

const API_BASE_URL = 'https://dummyjson.com';

class AuthService {
  async login(username, password) {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        username,
        password,
      });
      
      return {
        success: true,
        user: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed',
      };
    }
  }

  async getCurrentUser() {
    try {
      const token = localStorage.getItem('token');
      if (!token) return null;

      const response = await axios.get(`${API_BASE_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getStoredUser() {
    try {
      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      
      if (user && token) {
        return {
          user: JSON.parse(user),
          token,
        };
      }
      return null;
    } catch (error) {
      console.error('Error getting stored user:', error);
      return null;
    }
  }
}

export const authService = new AuthService();
