import { combineReducers } from 'redux';
import authReducer from './authSlice';
import postsReducer from './postsSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
});

export default rootReducer;