/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import initialStateSnackbar from "./initialState";
import fetchVendorCodes from "./fetchVendorCodes";
import serverRequest from "./serverRequest";
import sendNewVendorCode from "./sendNewVendorCode";

/* const setError = (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
  setSnackbar(state, "error", "Ошибка получения данных с сервера.");
}; */

const snackbar = createSlice({
  name: "snackbar",
  initialState: { open: false, severity: "info", message: null },

  reducers: {
    closeSnack: ({ snackbars }) => {
      snackbars.open = false;
    },
  },
});

export const { closeSnack } = snackbar.actions;
export default snackbar.reducer;
