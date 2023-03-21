/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
};

export const serverRequest = createAsyncThunk(
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
  "inputField/fetchVendorCodes",
  async (_, { rejectWithValue, getState, dispatch }) => {
    // запрос с фильтром
    // оставляем для запроса только буквы и цифры,
    // остальное заменяем на маску "любые символы - "%"
    // если введены данные в два поля (артикул и название) - фильтр не используем

    const { vendorCode, itemName, prevReq } = getState();
    if (vendorCode && itemName) return null;

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

const setError = (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
};

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
      }
    },
    [serverRequest.rejected]: setError,
  },
});

export const { changeValue, copyPasteValue } = inputSlice.actions;

export default inputSlice.reducer;
