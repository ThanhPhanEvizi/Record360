import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import authApi from "../../api/authApi";
import {
  ForgotPasswordProps,
  LoginApiItems,
  LoginProps,
} from "../../types/models/auth";
import { PostResponse } from "../../types/models/common";
import {
  fetchForgotPassword,
  fetchForgotPasswordFailed,
  fetchForgotPasswordSuccess,
  fetchLogin,
  fetchLoginFailed,
  fetchLoginSuccess,
} from "./authSlice";

function* login(action: PayloadAction<LoginProps>) {
  const { success, error }: PostResponse<LoginApiItems> = yield call(
    authApi.login,
    action.payload
  );
  if (success) {
    yield put(fetchLoginSuccess(success));
  } else if (error) {
    yield put(fetchLoginFailed(error));
  }
}

function* forgotPassword(action: PayloadAction<ForgotPasswordProps>) {
  const { success, error }: PostResponse<any> = yield call(
    authApi.forgotPassword,
    action.payload
  );
  if (success) {
    yield put(fetchForgotPasswordSuccess(success));
  } else if (error) {
    yield put(fetchForgotPasswordFailed(error));
  }
}

export default function* authSaga() {
  yield takeLatest(fetchLogin.type, login);
  yield takeLatest(fetchForgotPassword.type, forgotPassword);
}
