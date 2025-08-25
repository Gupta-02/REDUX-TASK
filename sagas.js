import { all } from "redux-saga/effects";
import blogSaga from "./slices/blogSaga";
import authSaga from "./slices/authSaga";

export default function* rootSaga() {
  yield all([
    blogSaga(),
    authSaga(),
  ]);
}