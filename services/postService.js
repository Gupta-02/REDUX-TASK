import { apiFetch } from '../utils/api';

export async function fetchPostsApi() {
  const data = await apiFetch('https://dummyjson.com/posts');
  return data.posts;
}