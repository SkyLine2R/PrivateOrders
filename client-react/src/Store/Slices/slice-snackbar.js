/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import serverRequest from "../serverRequest";
import sendEntryToDB from "../sendEntryToDB";
import deleteEntryFromDB from "../deleteEntryFromDB";
import fetchEntries from "../fetchEntries";
import generateSuccessText from "./messages-for-slices";

const setSnackbar = (state, severity, message) => {
  state.severity = severity;
  state.message = message;
  state.open = true;
};

const snackbar = createSlice({
  name: "snackbar",
  initialState: { open: false, severity: "info", message: null },

  reducers: {
    setWarningSnack: (state, { payload }) => {
      setSnackbar(state, "warning", payload);
    },
    setErrorSnack: (state, { payload }) => {
      setSnackbar(state, "error", payload);
    },
    setSuccessSnack: (state, { payload }) => {
      setSnackbar(state, "success", payload);
    },
    closeSnack: (state) => {
      state.open = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendEntryToDB.rejected, (state, { payload }) => {
        if (payload?.error) setSnackbar(state, "warning", payload.error);
      })

      .addCase(sendEntryToDB.fulfilled, (state, { payload }) => {
        setSnackbar(state, "success", generateSuccessText(payload));
      })

      .addCase(serverRequest.rejected, (state, { payload }) => {
        setSnackbar(
          state,
          "error",
          `Ошибка при выполнении запроса.\n${payload.error}`
        );
      })

      .addCase(deleteEntryFromDB.rejected, (state, { payload }) => {
        if (payload?.error) setSnackbar(state, "warning", payload.error);
      })

      .addCase(deleteEntryFromDB.fulfilled, (state, { payload }) => {
        setSnackbar(state, "success", generateSuccessText(payload));
      })

      .addCase(fetchEntries.fulfilled, (state, { payload }) => {
        if (state.open) return;
        setSnackbar(
          state,
          "success",
          payload.data.length
            ? "Загружены обновлённые данные"
            : "В базе нет таких данных"
        );
      })

      .addCase(fetchEntries.rejected, (state, { payload }) => {
        setSnackbar(
          state,
          "error",
          `Ошибка получения данных\n${payload?.error}`
        );
      });
  },
});

export const { setWarningSnack, setErrorSnack, setSuccessSnack, closeSnack } =
  snackbar.actions;
export default snackbar.reducer;
