import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  currentPost: null,
  userPosts: [],
  loading: false,
  error: null,
  pagination: {
    total: 0,
    skip: 0,
    limit: 10,
  },
  searchResults: [],
  searchLoading: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // Fetch all posts
    fetchPostsRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    fetchPostsSuccess: (state, action) => {
      state.loading = false;
      state.posts = action.payload.posts;
      state.pagination = {
        total: action.payload.total,
        skip: action.payload.skip,
        limit: action.payload.limit,
      };
    },
    fetchPostsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Fetch single post
    fetchPostRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    fetchPostSuccess: (state, action) => {
      state.loading = false;
      state.currentPost = action.payload;
    },
    fetchPostFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Create post
    createPostRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    createPostSuccess: (state, action) => {
      state.loading = false;
      state.posts.unshift(action.payload);
      state.userPosts.unshift(action.payload);
    },
    createPostFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Update post
    updatePostRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    updatePostSuccess: (state, action) => {
      state.loading = false;
      const updatedPost = action.payload;
      state.posts = state.posts.map(post => 
        post.id === updatedPost.id ? updatedPost : post
      );
      state.userPosts = state.userPosts.map(post => 
        post.id === updatedPost.id ? updatedPost : post
      );
      if (state.currentPost && state.currentPost.id === updatedPost.id) {
        state.currentPost = updatedPost;
      }
    },
    updatePostFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Delete post
    deletePostRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    deletePostSuccess: (state, action) => {
      state.loading = false;
      const postId = action.payload;
      state.posts = state.posts.filter(post => post.id !== postId);
      state.userPosts = state.userPosts.filter(post => post.id !== postId);
    },
    deletePostFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Search posts
    searchPostsRequest: (state, action) => {
      state.searchLoading = true;
      state.error = null;
    },
    searchPostsSuccess: (state, action) => {
      state.searchLoading = false;
      state.searchResults = action.payload.posts;
    },
    searchPostsFailure: (state, action) => {
      state.searchLoading = false;
      state.error = action.payload;
    },
    
    // Fetch user posts
    fetchUserPostsRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    fetchUserPostsSuccess: (state, action) => {
      state.loading = false;
      state.userPosts = action.payload.posts;
    },
    fetchUserPostsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
    
    // Clear search results
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
  },
});

export const {
  fetchPostsRequest,
  fetchPostsSuccess,
  fetchPostsFailure,
  fetchPostRequest,
  fetchPostSuccess,
  fetchPostFailure,
  createPostRequest,
  createPostSuccess,
  createPostFailure,
  updatePostRequest,
  updatePostSuccess,
  updatePostFailure,
  deletePostRequest,
  deletePostSuccess,
  deletePostFailure,
  searchPostsRequest,
  searchPostsSuccess,
  searchPostsFailure,
  fetchUserPostsRequest,
  fetchUserPostsSuccess,
  fetchUserPostsFailure,
  clearError,
  clearSearchResults,
} = postsSlice.actions;

export default postsSlice.reducer;
