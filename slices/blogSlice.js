import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
  loading: false,
  error: null,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    fetchBlogsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchBlogsSuccess(state, action) {
      state.loading = false;
      state.blogs = action.payload;
    },
    fetchBlogsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // Add more CRUD actions as needed
  },
});

export const {
  fetchBlogsRequest,
  fetchBlogsSuccess,
  fetchBlogsFailure,
} = blogSlice.actions;

export default blogSlice.reducer;