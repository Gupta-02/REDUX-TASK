import { all } from 'redux-saga/effects';
import authSaga from './sagas/authSaga';
import postsSaga from './sagas/postsSaga';

export default function* rootSaga() {
  yield all([
    authSaga(),
    postsSaga(),
  ]);
}