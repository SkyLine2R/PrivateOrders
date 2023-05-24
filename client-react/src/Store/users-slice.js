/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";
import fetchUsers from "./users-fetch";
import serverRequest from "./serverRequest";
import sendNewVendorCode from "./sendNewVendorCode";

const setSnackbar = ({ snackbars }, severity, message) => {
  snackbars.severity = severity;
  snackbars.message = message;
  snackbars.open = true;
};

const setError = ({ snackbars }, action) => {
  snackbars.status = "rejected";
  snackbars.error = action.payload;
  setSnackbar(snackbars, "error", "Ошибка получения данных с сервера.");
};

export const usersSlice = createSlice({
  name: "inputField",
  initialState,

  reducers: {
    setModalWindowVendorCodeOpen: (state) => {
      state.modalWindowVendorCodeOpen = !state.modalWindowVendorCodeOpen;
    },
    changeValue: ({ inputFields }, { payload }) => {
      inputFields[payload.fieldId] = payload.value;
    },
    copyPasteValue: ({ vendorCodesArr, inputFields }, { payload }) => {
      inputFields[payload.fieldId] = vendorCodesArr.find(
        (item) => item.id === payload.id
      )[payload.fieldId];
    },
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

    [fetchUsers.fulfilled]: (state, { payload }) => {
      setSnackbar(
        state,
        "success",
        payload.data.length
          ? "Пользователи обновлены"
          : "В базе нет таких пользователей"
      );
      state.vendorCodesArr = payload.data || [];
    },
    [sendNewVendorCode.pending]: (state) => {
      state.lastVendorCodeId = null;
    },
    [sendNewVendorCode.fulfilled]: (state, { payload }) => {
      setSnackbar(
        state,
        "success",
        `Пользователь "${payload.vendorCode}" добавлен в базу данных!`
      );
      [state.lastVendorCodeId] = [...payload.id];
      state.modalWindowVendorCodeOpen = false;
      state.inputFields = {
        vendorCode: "",
        itemName: "",
        unit: 0,
        quantity: 0,
        notes: "",
      };
      state.vendorCodesArr = [];
    },
    [sendNewVendorCode.rejected]: (state, { payload }) => {
      if (payload) setSnackbar(state, "warning", payload);
    },
  },
});

export const {
  setModalWindowVendorCodeOpen,
  changeValue,
  copyPasteValue,
  setSnack,
  closeSnack,
} = usersSlice.actions;

export default usersSlice.reducer;
