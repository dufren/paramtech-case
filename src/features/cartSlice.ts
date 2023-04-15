import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PackageType } from "../types/types";

type InitialStateType = {
  cart: PackageType[];
  cartTotal: number;
};

const initialStateLocal = // checking localstorage to keep data in cache
  localStorage.getItem("cartState") !== null
    ? JSON.parse(localStorage.getItem("cartState") || "")
    : null;

const initialState: InitialStateType = {
  cart: initialStateLocal === null ? [] : initialStateLocal.cart,
  cartTotal: initialStateLocal === null ? 0 : initialStateLocal.cartTotal,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<PackageType>) => {
      const { id, amount } = action.payload;
      const isPackageInCart = state.cart.some((item) => item.id === id);

      if (isPackageInCart) {
        state.cart = state.cart.filter((item) => item.id !== id);
        state.cartTotal -= amount;
      } else {
        state.cart.push(action.payload);
        state.cartTotal += amount;
      }

      localStorage.setItem("cartState", JSON.stringify(state));
    },
    paymentReset: (state) => {
      state.cart = [];
      state.cartTotal = 0;

      localStorage.setItem("cartState", JSON.stringify(state));
    },
  },
});

export const { addToCart, paymentReset } = cartSlice.actions;

export default cartSlice.reducer;
