import { all } from "redux-saga/effects";
import authSaga from "../redux/auth/authSaga";

export default function* rootSaga() {
  yield all([authSaga()]);
}
