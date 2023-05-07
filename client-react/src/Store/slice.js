/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";
import fetchVendorCodes from "./fetchVendorCodes";
import serverRequest from "./serverRequest";
import sendNewVendorCode from "./sendNewVendorCode";

const setSnackbar = (state, severity, message) => {
  state.snackbars.severity = severity;
  state.snackbars.message = message;
  state.snackbars.open = true;
};

const setError = (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
  setSnackbar(state, "error", "Ошибка получения данных с сервера.");
};

export const inputSlice = createSlice({
  name: "inputField",
  initialState,

  reducers: {
    setModalWindowVendorCodeOpen: (state) => {
      state.modalWindowVendorCodeOpen = !state.modalWindowVendorCodeOpen;
    },
    changeValue: (state, target) => {
      state[target.payload.fieldId] = target.payload.value;
    },
    copyPasteValue: (state, target) => {
      state[target.payload.fieldId] = state.vendorCodesArr.find(
        (item) => item.id === target.payload.id
      )[target.payload.fieldId];
    },
    closeSnack: (state) => {
      state.snackbars.open = false;
    },
  },
  extraReducers: {
    [serverRequest.pending]: (state, action) => {
      state.prevReq = action.meta.arg;
      state.status = "loading";
      state.error = null;
    },
    [serverRequest.fulfilled]: (state) => {
      state.status = "resolved";
    },
    [serverRequest.rejected]: setError,

    [fetchVendorCodes.fulfilled]: (state, action) => {
      setSnackbar(
        state,
        "success",
        action.payload.data.length
          ? "Артикулы обновлены"
          : "В базе нет подобных артикулов"
      );
      state.vendorCodesArr = action.payload.data || [];
    },
    [sendNewVendorCode.pending]: (state) => {
      state.lastVendorCodeId = null;
    },
    [sendNewVendorCode.fulfilled]: (state, action) => {
      setSnackbar(
        state,
        "success",
        `Успех! Артикул "${action.payload.vendorCode}" добавлен в базу данных!`
      );
      [state.lastVendorCodeId] = [...action.payload.id];
      state.modalWindowVendorCodeOpen = false;
      state.vendorCode = "";
      state.itemName = "";
      state.unit = 0;
      state.quantity = 0;
      state.notes = "";
    },
    [sendNewVendorCode.rejected]: (state, action) => {
      if (action.payload) setSnackbar(state, "warning", action.payload);
    },
  },
});

export const {
  setModalWindowVendorCodeOpen,
  changeValue,
  copyPasteValue,
  setSnack,
  closeSnack,
} = inputSlice.actions;

export default inputSlice.reducer;
