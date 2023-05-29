/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import initialStateSnackbar from "./initialState";
import fetchVendorCodes from "./fetchVendorCodes";
import serverRequest from "./serverRequest";
import sendNewVendorCode from "./sendNewVendorCode";

export const setSnackbar = (state, severity, message) => {
  state.severity = severity;
  state.message = message;
  state.open = true;
};

const setError = (state, { payload }) => {
  state.status = "rejected";
  state.error = payload;
  setSnackbar(state, "error", `Ошибка получения данных с сервера \n${payload}`);
};

const snackbar = createSlice({
  name: "snackbar",
  initialState: { open: false, severity: "info", message: null },

  reducers: {
    closeSnack: (state) => {
      state.open = false;
    },
    /*     setError: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
      setSnackbar(state, "error", "Ошибка получения данных с сервера.");
    }, */
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendorCodes.fulfilled, (state, { payload }) => {
        setSnackbar(
          state,
          "success",
          payload.data.length
            ? "Артикулы обновлены"
            : "В базе нет подобных артикулов"
        );
      })
      .addCase(serverRequest.rejected, (state, action) => {
        setError(state, action);
        /* setError */
      });
  },
});

export const { closeSnack } = snackbar.actions;
export default snackbar.reducer;
