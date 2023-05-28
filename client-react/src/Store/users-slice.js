/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  initialState: { name: "oleg", age: 20 },
  reducers: {
    setUserName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { setUserName } = user.actions;

export default user.reducer;

/* const setSnackbar = ({ snackbars }, severity, message) => {
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
  name: "inputUserField",
  initialState,

  reducers: {
    setModalWindowAddUserOpen: (state) => {
      state.modalWindowAddUserOpen = !state.modalWindowAddUserOpen;
    },
    changeValue: ({ inputFields }, { payload }) => {
      inputFields[payload.fieldId] = payload.value;
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
          ? "Список пользователей обновлен"
          : "В базе нет пользователей"
      );
      state.users = payload.data || [];
    },
    /*     [sendNewVendorCode.pending]: (state) => {
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

export const { setModalWindowAddUserOpen, changeValue, setSnack, closeSnack } =
  usersSlice.actions;

export default usersSlice.reducer;
 */
