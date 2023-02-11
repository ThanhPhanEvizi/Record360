import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { saveUserCredential } from "../../services/auth";
import {
  ForgotPasswordProps,
  LoginApiItems,
  LoginProps,
} from "../../types/models/auth";
import { ErrorResponse, SuccessResponse } from "../../types/models/common";

export interface AuthState {
  isLoading: boolean;
  formValue: LoginProps;
  status: number;
  apiMessage: string;
}

const initialState: AuthState = {
  isLoading: false,
  formValue: { email: "", password: "" },
  status: 0,
  apiMessage: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    //login
    fetchLogin(state, action: PayloadAction<LoginProps>) {
      state.isLoading = true;
    },
    fetchLoginSuccess(
      state,
      action: PayloadAction<SuccessResponse<LoginApiItems>>
    ) {
      const responsive = action.payload.response;
      const { access, refresh, username, role } = responsive;
      saveUserCredential({ access, refresh, username, role });
      state.isLoading = false;
      state.status = action.payload.status;
    },
    fetchLoginFailed(state, action: PayloadAction<ErrorResponse>) {
      state.isLoading = false;
      state.status = action.payload.status;
      state.apiMessage = action.payload.message;
    },
    //fetch forgot password
    fetchForgotPassword(state, action: PayloadAction<ForgotPasswordProps>) {
      state.isLoading = true;
    },
    fetchForgotPasswordSuccess(
      state,
      action: PayloadAction<SuccessResponse<any>>
    ) {
      state.status = action.payload.status;
      state.isLoading = false;
    },
    fetchForgotPasswordFailed(state, action: PayloadAction<ErrorResponse>) {
      state.status = action.payload.status;
      state.isLoading = false;
      state.apiMessage = action.payload.message;
    },
    resetStatusFetchAuth(state) {
      state.status = 0;
      state.apiMessage = "";
    },
  },
});

//Actions
export const {
  fetchLogin,
  fetchLoginSuccess,
  fetchLoginFailed,
  fetchForgotPassword,
  fetchForgotPasswordSuccess,
  fetchForgotPasswordFailed,
  resetStatusFetchAuth,
} = authSlice.actions;

//Selectors
export const selectLoading = (state: RootState) => state.auth.isLoading;
export const selectStatus = (state: RootState) => state.auth.status;
export const selectApiMessage = (state: RootState) => state.auth.apiMessage;

//Reducer
const authReducer = authSlice.reducer;
export default authReducer;
