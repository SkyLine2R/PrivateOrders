/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import testSendData from "../../components/testing-data-from-input";

const fetchUrlAPI = "http://localhost:3000/api";
const regExpForFilter = /[^а-яё\d\w]/gi; // регулярка для запроса быстрого фильтра по артикулам

const initialState = {
  vendorCode: "",
  itemName: "",
  unit: "0",
  quantity: "1",
  notes: "",
  vendorCodesArr: [],
  prevReq: { req: false },
  status: null,
  error: null,
  snackbars: { open: false, severity: "info", message: null },
};

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

const serverRequest = createAsyncThunk(
  "api/serverRequest",
  async (fetchObj, { rejectWithValue }) => {
    try {
      const response = await fetch(fetchUrlAPI, {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        referrerPolicy: "no-referrer",
        body: JSON.stringify(fetchObj),
      });
      if (!response.ok) {
        throw new Error("Ошибка получения данных с сервера");
      }
      const respData = await response.json();
      return { vendorCodesArr: respData, prevReq: fetchObj };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchVendorCodes = createAsyncThunk(
  "api/fetchVendorCodes",
  async (_, { getState, dispatch }) => {
    // запрос с фильтром оставляем для запроса только буквы и цифры,
    // остальное заменяем на маску "любые символы - "%"
    // если введены данные в два поля (артикул и название) - фильтр не используем
    const { vendorCode, itemName, prevReq } = getState();
    if (vendorCode && itemName) return null;
    console.log("Автофильтр из базы");

    const fetchObj = {
      type: "getFilteredVendorCodes",
      table: "items",
      column: `${vendorCode ? "vendorCode" : "tags"}`,
      data: `${
        (vendorCode || itemName).replace(regExpForFilter, "%").toLowerCase() ||
        ""
      }`,
    };
    if (JSON.stringify(prevReq) === JSON.stringify(fetchObj)) {
      return null;
    }
    const resp = await dispatch(serverRequest(fetchObj));
    return resp.error ? null : { ...resp };
  }
);

export const sendNewVendorCode = createAsyncThunk(
  "inputField/sendNewVendorCodes",
  async (dbSchema, { getState, dispatch, rejectWithValue }) => {
    // отправка нового артикула для записи в БД
    // подберём из State ключи нового артикула, которые должны отправиться в базу, согласно схемы
    // И проверим объект на правильность заполнения
    const state = getState();
    const keys = Object.keys(dbSchema);
    const objVendorCode = keys.reduce(
      (obj, key) => ({ ...obj, [key]: state[key] }),
      {}
    );
    const data = testSendData(dbSchema, objVendorCode);

    if (data.errors)
      return rejectWithValue(`Данные не сохранены.\n${data.errors.join("\n")}`);

    const fetchObj = {
      type: "addNewVendorCode",
      data: { ...data },
    };

    if (JSON.stringify(state.prevReq) === JSON.stringify(fetchObj)) {
      return null;
    }
    const resp = await dispatch(serverRequest(fetchObj));
    return resp.error ? null : { ...resp };
  }
);

export const inputSlice = createSlice({
  name: "inputField",
  initialState,

  reducers: {
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
    [serverRequest.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [serverRequest.fulfilled]: (state, action) => {
      state.status = "resolved";
      if (action.payload) {
        state.vendorCodesArr = action.payload.vendorCodesArr;
        state.prevReq = action.payload.prevReq;
        setSnackbar(state, "success", "Данные обновлены");
      }
    },
    [serverRequest.rejected]: setError,

    [sendNewVendorCode.rejected]: (state, action) => {
      setSnackbar(state, "warning", action.payload);
    },
  },
});

export const { changeValue, copyPasteValue, setSnack, closeSnack } =
  inputSlice.actions;

export default inputSlice.reducer;
