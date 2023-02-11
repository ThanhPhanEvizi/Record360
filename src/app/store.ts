import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { history } from "../until/saga/history";
import rootSaga from "./rootSaga";
import authReducer from "../redux/auth/authSlice";
import appReducer from "../redux/app/appSlice";

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  app: appReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(sagaMiddleware)
      .concat(routerMiddleware(history)), //thêm saga middleware và routerMiddleware
});

sagaMiddleware.run(rootSaga); //saga middleware chạy rootSaga

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
