/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import serverRequest from "../serverRequest";
import fetchVendorCodes from "../fetchVendorCodes";
import sendNewEntryToDB from "../sendNewEntryToDB";
import sendChangedEntryToDB from "../sendChangedEntryToDB";
import deleteEntryFromDB from "../deleteEntryFromDB";
import fetchEntries from "../fetchEntries";

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
      .addCase(fetchVendorCodes.fulfilled, (state, { payload }) => {
        if (state.open) return;
        setSnackbar(
          state,
          "success",
          payload.data.length
            ? "Артикулы обновлены"
            : "В базе нет подобных артикулов"
        );
      })
      .addCase(sendNewEntryToDB.rejected, (state, { payload }) => {
        if (payload?.error) setSnackbar(state, "warning", payload.error);
      })
      .addCase(sendNewEntryToDB.fulfilled, (state, { payload }) => {
        const msg =
          payload.api === "vendorCodes"
            ? `Артикул "${payload.data?.vendorCode}"`
            : payload.api === "users"
            ? `Пользователь "${payload.data?.login}"`
            : payload.api === "customers"
            ? `Склад заказчика "${payload.data?.name}"`
            : payload.api === "colors"
            ? `Цвет "${payload.data?.name}"`
            : payload.api === "documentsInStock" ||
              payload.api === "documentsOutStock"
            ? `Документ "${payload.data?.name}"`
            : "";
        setSnackbar(state, "success", `${msg} добавлен в базу данных.`);
      })
      .addCase(serverRequest.rejected, (state, { payload }) => {
        setSnackbar(
          state,
          "error",
          `Ошибка при выполнении запроса.\n${payload.error}`
        );
      })
      .addCase(sendChangedEntryToDB.rejected, (state, { payload }) => {
        if (payload?.error) setSnackbar(state, "warning", payload.error);
      })
      .addCase(sendChangedEntryToDB.fulfilled, (state, { payload }) => {
        const msg =
          payload.api === "vendorCodes"
            ? `Данные артикула "${payload.data.vendorCode}"`
            : payload.api === "users"
            ? `Данные пользователя "${payload.data.login}"`
            : payload.api === "customers"
            ? `Данные склада "${payload.data.name}"`
            : payload.api === "colors"
            ? `Данные цвета "${payload.data.name}"`
            : payload.api === "documentsInStock" ||
              payload.api === "documentsOutStock"
            ? `Реквизиты документа "${payload.data.name}"`
            : "";
        setSnackbar(state, "success", `${msg} обновлены`);
      })
      .addCase(deleteEntryFromDB.rejected, (state, { payload }) => {
        if (payload?.error) setSnackbar(state, "warning", payload.error);
      })
      .addCase(deleteEntryFromDB.fulfilled, (state, { payload }) => {
        const msg =
          payload.api === "vendorCodes"
            ? `Артикул "${payload.data.vendorCode}"`
            : payload.api === "users"
            ? `Пользователь "${payload.data.login}"`
            : payload.api === "customers"
            ? `Склад "${payload.data.name}"`
            : payload.api === "colors"
            ? `Цвет "${payload.data.name}"`
            : payload.api === "documentsInStock" ||
              payload.api === "documentsOutStock"
            ? `Документ "${payload.data.name}"`
            : "";
        setSnackbar(state, "success", `${msg} удалён из БД.`);
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
