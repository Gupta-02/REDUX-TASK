import axios from 'axios';

const API_BASE_URL = 'https://dummyjson.com';

class PostService {
  async fetchPosts(skip = 0, limit = 10) {
    try {
      const response = await axios.get(`${API_BASE_URL}/posts?skip=${skip}&limit=${limit}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch posts');
    }
  }

  async fetchPost(id) {
    try {
      const response = await axios.get(`${API_BASE_URL}/posts/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch post');
    }
  }

  async createPost(postData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/posts/add`, postData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create post');
    }
  }

  async updatePost(id, postData) {
    try {
      const response = await axios.put(`${API_BASE_URL}/posts/${id}`, postData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update post');
    }
  }

  async deletePost(id) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/posts/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete post');
    }
  }

  async searchPosts(query) {
    try {
      const response = await axios.get(`${API_BASE_URL}/posts/search?q=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to search posts');
    }
  }

  async fetchUserPosts(userId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/posts/user/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user posts');
    }
  }
}

export const postService = new PostService();
