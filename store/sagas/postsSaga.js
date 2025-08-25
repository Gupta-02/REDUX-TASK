import { takeLatest, call, put } from 'redux-saga/effects';
import { fetchPostsRequest, fetchPostsSuccess, fetchPostsFailure } from '../slices/postsSlice';
import { fetchPostsApi } from '../../services/postService';

function* handleFetchPosts() {
  try {
    const posts = yield call(fetchPostsApi);
    yield put(fetchPostsSuccess(posts));
  } catch (error) {
    yield put(fetchPostsFailure(error.message));
  }
}

export default function* postsSaga() {
  yield takeLatest(fetchPostsRequest.type, handleFetchPosts);
}