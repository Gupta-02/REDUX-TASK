import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchPostsRequest,
  fetchPostsSuccess,
  fetchPostsFailure,
  addPostRequest,
  addPostSuccess,
  addPostFailure,
} from '../slices/postsSlice';
import { fetchPostsApi, addPostApi } from '../../services/postService';

function* fetchPostsSaga() {
  try {
    const posts = yield call(fetchPostsApi);
    yield put(fetchPostsSuccess(posts));
  } catch (error) {
    yield put(fetchPostsFailure(error.message));
  }
}

function* addPostSaga(action) {
  try {
    const post = yield call(addPostApi, action.payload);
    yield put(addPostSuccess(post));
  } catch (error) {
    yield put(addPostFailure(error.message));
  }
}

export default function* postsSaga() {
  yield takeLatest(fetchPostsRequest.type, fetchPostsSaga);
  yield takeLatest(addPostRequest.type, addPostSaga);
}