import { call, put, takeLatest, select } from 'redux-saga/effects';
import {
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
} from '../slices/postsSlice';
import { postService } from '../../services/postService';

function* fetchPostsSaga(action) {
  try {
    const { skip = 0, limit = 10 } = action.payload || {};
    const response = yield call(postService.fetchPosts, skip, limit);
    
    yield put(fetchPostsSuccess({
      posts: response.posts,
      total: response.total,
      skip: response.skip,
      limit: response.limit,
    }));
  } catch (error) {
    yield put(fetchPostsFailure(error.message || 'Failed to fetch posts'));
  }
}

function* fetchPostSaga(action) {
  try {
    const { id } = action.payload;
    const response = yield call(postService.fetchPost, id);
    
    yield put(fetchPostSuccess(response));
  } catch (error) {
    yield put(fetchPostFailure(error.message || 'Failed to fetch post'));
  }
}

function* createPostSaga(action) {
  try {
    const postData = action.payload;
    const response = yield call(postService.createPost, postData);
    
    yield put(createPostSuccess(response));
  } catch (error) {
    yield put(createPostFailure(error.message || 'Failed to create post'));
  }
}

function* updatePostSaga(action) {
  try {
    const { id, ...postData } = action.payload;
    const response = yield call(postService.updatePost, id, postData);
    
    yield put(updatePostSuccess(response));
  } catch (error) {
    yield put(updatePostFailure(error.message || 'Failed to update post'));
  }
}

function* deletePostSaga(action) {
  try {
    const { id } = action.payload;
    yield call(postService.deletePost, id);
    
    yield put(deletePostSuccess(id));
  } catch (error) {
    yield put(deletePostFailure(error.message || 'Failed to delete post'));
  }
}

function* searchPostsSaga(action) {
  try {
    const { query } = action.payload;
    const response = yield call(postService.searchPosts, query);
    
    yield put(searchPostsSuccess({
      posts: response.posts,
    }));
  } catch (error) {
    yield put(searchPostsFailure(error.message || 'Failed to search posts'));
  }
}

function* fetchUserPostsSaga(action) {
  try {
    const { userId } = action.payload;
    const response = yield call(postService.fetchUserPosts, userId);
    
    yield put(fetchUserPostsSuccess({
      posts: response.posts,
    }));
  } catch (error) {
    yield put(fetchUserPostsFailure(error.message || 'Failed to fetch user posts'));
  }
}

export default function* postsSaga() {
  yield takeLatest(fetchPostsRequest.type, fetchPostsSaga);
  yield takeLatest(fetchPostRequest.type, fetchPostSaga);
  yield takeLatest(createPostRequest.type, createPostSaga);
  yield takeLatest(updatePostRequest.type, updatePostSaga);
  yield takeLatest(deletePostRequest.type, deletePostSaga);
  yield takeLatest(searchPostsRequest.type, searchPostsSaga);
  yield takeLatest(fetchUserPostsRequest.type, fetchUserPostsSaga);
}
