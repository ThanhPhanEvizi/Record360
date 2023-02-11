import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { NavigationProps } from "../../types/models/app";

export interface AuthState {
  routerList: NavigationProps[];
}

const initialState: AuthState = {
  routerList: [],
};

const appSlice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    addRouter(state, action: PayloadAction<NavigationProps>) {
      state.routerList.push(action.payload);
    },
  },
});

//Actions
export const { addRouter } = appSlice.actions;

//Selectors
export const selectRoutes = (state: RootState) => state.app.routerList;

//Reducer
const appReducer = appSlice.reducer;
export default appReducer;
