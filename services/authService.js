import { apiFetch } from '../utils/api';

export async function loginApi({ username, password }) {
  return apiFetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password })
  });
}