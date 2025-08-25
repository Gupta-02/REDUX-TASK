import { call, put, takeLatest } from "redux-saga/effects";
import { fetchBlogsRequest, fetchBlogsSuccess, fetchBlogsFailure } from "./blogSlice";

function fetchBlogsApi() {
  return fetch("/api/blogs").then((res) => res.json());
}

function* fetchBlogs() {
  try {
    const blogs = yield call(fetchBlogsApi);
    yield put(fetchBlogsSuccess(blogs));
  } catch (error) {
    yield put(fetchBlogsFailure(error.message));
  }
}

export default function* blogSaga() {
  yield takeLatest(fetchBlogsRequest.type, fetchBlogs);
}