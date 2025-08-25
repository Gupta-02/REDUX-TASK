import { call, put, takeLatest } from 'redux-saga/effects';
import { loginRequest, loginSuccess, loginFailure } from '../slices/authSlice';
import { loginApi } from '../../services/authService';

function* loginSaga(action) {
  try {
    const user = yield call(loginApi, action.payload);
    yield put(loginSuccess(user));
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}

export default function* authSaga() {
  yield takeLatest(loginRequest.type, loginSaga);
}