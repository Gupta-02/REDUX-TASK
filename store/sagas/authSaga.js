import { call, put, takeLatest } from 'redux-saga/effects';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
} from '../slices/authSlice';
import { authService } from '../../services/authService';

function* loginSaga(action) {
  try {
    const { username, password } = action.payload;
    const response = yield call(authService.login, username, password);
    
    if (response.success) {
      // Store token in localStorage
      localStorage.setItem('token', response.user.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      yield put(loginSuccess({
        user: response.user,
        token: response.user.token,
      }));
    } else {
      yield put(loginFailure(response.error || 'Login failed'));
    }
  } catch (error) {
    yield put(loginFailure(error.message || 'Login failed'));
  }
}

function* logoutSaga() {
  try {
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    yield put(logoutSuccess());
  } catch (error) {
    console.error('Logout error:', error);
    yield put(logoutSuccess()); // Still logout even if there's an error
  }
}

export default function* authSaga() {
  yield takeLatest(loginRequest.type, loginSaga);
  yield takeLatest(logoutRequest.type, logoutSaga);
}
