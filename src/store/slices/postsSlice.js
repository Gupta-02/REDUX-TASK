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
    fetchPostsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPostsSuccess: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    fetchPostsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addPostRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    addPostSuccess: (state, action) => {
      state.loading = false;
      state.posts.push(action.payload);
    },
    addPostFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchPostsRequest,
  fetchPostsSuccess,
  fetchPostsFailure,
  addPostRequest,
  addPostSuccess,
  addPostFailure,
} = postsSlice.actions;
export default postsSlice.reducer;