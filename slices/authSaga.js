import { call, put, takeLatest } from "redux-saga/effects";
import { loginRequest, loginSuccess, loginFailure } from "./authSlice";

function loginApi(credentials) {
  return fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  }).then((res) => res.json());
}

function* login(action) {
  try {
    const user = yield call(loginApi, action.payload);
    if (user && user.token) {
      yield put(loginSuccess(user));
    } else {
      yield put(loginFailure("Invalid credentials"));
    }
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}

export default function* authSaga() {
  yield takeLatest(loginRequest.type, login);
}