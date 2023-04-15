import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { FormValuesType } from "../types/types";

type InitialStateType = {
  userInfo: FormValuesType;
  isLoggedIn: boolean;
};

const initialStateLocal =
  sessionStorage.getItem("loginState") !== null
    ? JSON.parse(sessionStorage.getItem("loginState") || "")
    : null;

const initialState: InitialStateType = {
  userInfo: initialStateLocal === null ? {} : initialStateLocal.userInfo,
  isLoggedIn: initialStateLocal === null ? false : initialStateLocal.isLoggedIn,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    getLoginData: (state, action: PayloadAction<FormValuesType>) => {
      state.userInfo = action.payload;
      state.isLoggedIn = true;

      sessionStorage.setItem("loginState", JSON.stringify(state));
    },
  },
});

export const { getLoginData } = loginSlice.actions;

export default loginSlice.reducer;
