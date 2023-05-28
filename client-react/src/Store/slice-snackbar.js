/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import initialStateSnackbar from "./initialState";
import fetchVendorCodes from "./fetchVendorCodes";
import serverRequest from "./serverRequest";
import sendNewVendorCode from "./sendNewVendorCode";

const setSnackbar = (state, severity, message) => {
  state.severity = severity;
  state.message = message;
  state.open = true;
};

const setError = (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
  setSnackbar(state, "error", "Ошибка получения данных с сервера.");
};

const snackbar = createSlice({
  name: "snackbar",
  initialState: { open: false, severity: "info", message: null },

  reducers: {
    closeSnack: ({ snackbars }) => {
      snackbars.open = false;
    },
  },
  extraReducers: {
    [serverRequest.pending]: ({ request }, action) => {
      request.prevReq = action.meta.arg;
      request.status = "loading";
      request.error = null;
    },
    [serverRequest.fulfilled]: ({ request }) => {
      request.status = "resolved";
    },
    [serverRequest.rejected]: setError,

    [fetchVendorCodes.fulfilled]: (state, { payload }) => {
      setSnackbar(
        state,
        "success",
        payload.data.length
          ? "Артикулы обновлены"
          : "В базе нет подобных артикулов"
      );
    },
    [sendNewVendorCode.fulfilled]: (state, { payload }) => {
      setSnackbar(
        state,
        "success",
        `Артикул "${payload.vendorCode}" добавлен в базу данных!`
      );
    },
    [sendNewVendorCode.rejected]: (state, { payload }) => {
      if (payload) setSnackbar(state, "warning", payload);
    },
  },
});

export const { closeSnack } = snackbar.actions;
export default snackbar.reducer;
