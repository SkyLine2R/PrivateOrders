/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import fetchVendorCodes from "../fetchVendorCodes";
import serverRequest from "../serverRequest";
import sendNewEntryToDB from "../sendNewVendorCode";

const setSnackbar = (state, severity, message) => {
  state.severity = severity;
  state.message = message;
  state.open = true;
};

const snackbar = createSlice({
  name: "snackbar",
  initialState: { open: false, severity: "info", message: null },

  reducers: {
    closeSnack: (state) => {
      state.open = false;
    },
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
      .addCase(serverRequest.rejected, (state, { payload }) => {
        setSnackbar(
          state,
          "error",
          `Ошибка получения данных с сервера \n${payload}`
        );
      })
      .addCase(sendNewEntryToDB.fulfilled, (state, { payload }) => {
        if (payload.api !== "vendorCodes") return;
        setSnackbar(
          state,
          "success",
          `Артикул "${payload.data.vendorCode}" добавлен в базу данных!`
        );
      })
      .addCase(sendNewEntryToDB.rejected, (state, { payload }) => {
        if (payload.api !== "vendorCodes") return;
        setSnackbar(state, "warning", payload.data);
      });
  },
});

export const { closeSnack } = snackbar.actions;
export default snackbar.reducer;
