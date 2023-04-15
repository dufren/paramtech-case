import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { FormValuesType } from "../types/types";

type InitialStateType = {
  userInfo: FormValuesType;
  isLoggedIn: boolean;
};

const initialStateLocal =
  localStorage.getItem("loginState") !== null
    ? JSON.parse(localStorage.getItem("loginState") || "")
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

      localStorage.setItem("loginState", JSON.stringify(state));
    },
  },
});

export const { getLoginData } = loginSlice.actions;

export default loginSlice.reducer;
