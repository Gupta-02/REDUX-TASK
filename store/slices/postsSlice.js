import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    fetchPostsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPostsSuccess(state, action) {
      state.loading = false;
      state.posts = action.payload;
    },
    fetchPostsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchPostsRequest, fetchPostsSuccess, fetchPostsFailure } = postsSlice.actions;
export default postsSlice.reducer;