import { combineReducers } from "@reduxjs/toolkit";
import blogReducer from "./slices/blogSlice";
import authReducer from "./slices/authSlice";

const rootReducer = combineReducers({
  blog: blogReducer,
  auth: authReducer,
});

export default rootReducer;