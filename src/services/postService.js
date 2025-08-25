import axios from 'axios';

export const fetchPostsApi = async () => {
  const response = await axios.get('https://dummyjson.com/posts');
  return response.data.posts;
};

export const addPostApi = async (postData) => {
  const response = await axios.post('https://dummyjson.com/posts/add', postData);
  return response.data;
};