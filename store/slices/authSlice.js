import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null,
  loading: false,
  error: null,
  isAuthenticated: typeof window !== 'undefined' ? !!localStorage.getItem('user') : false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(action.payload));
      }
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
      }
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;