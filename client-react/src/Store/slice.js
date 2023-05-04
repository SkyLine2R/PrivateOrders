/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import initialState from "./initialState";
import testSendData from "../../../components/testing-data-from-input";

const fetchUrlAPI = "http://localhost:3000/api";

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

      return { data: respData, prevReq: fetchObj };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchVendorCodes = createAsyncThunk(
  "api/fetchVendorCodes",
  async (_, { getState, dispatch, rejectWithValue, rejected }) => {
    // запрос с фильтром оставляем для запроса только буквы и цифры,
    // остальное заменяем на маску "любые символы - "%"
    // если введены данные в два поля (артикул и название) - фильтр не используем
    const { vendorCode, itemName, prevReq } = getState();
    if (vendorCode && itemName) return rejected();

    const fetchObj = {
      type: "getFilteredVendorCodes",
      data: {
        table: "items",
        column: `${vendorCode ? "vendorCode" : "itemName"}`,
        string: vendorCode || itemName || "",
      },
    };
    if (JSON.stringify(prevReq) === JSON.stringify(fetchObj)) {
      return rejected();
    }
    const resp = await dispatch(serverRequest(fetchObj));
    return resp.payload.data.error
      ? rejectWithValue(resp.payload.error)
      : resp.payload;
  }
);

export const sendNewVendorCode = createAsyncThunk(
  "inputField/sendNewVendorCodes",
  async (dbSchema, { getState, dispatch, rejectWithValue }) => {
    // отправка нового артикула для записи в БД
    try {
      const state = getState();
      const keys = Object.keys(dbSchema);
      // подберём согласно схемы из State ключи нового артикула,
      // которые должны отправиться в базу
      const objVendorCode = keys.reduce(
        (obj, key) => ({ ...obj, [key]: state[key] }),
        {}
      );
      const data = testSendData(dbSchema, objVendorCode);

      if (data.error) {
        return rejectWithValue(
          `Данные не отправлены.\n${data.error.join("\n")}`
        );
      }

      const fetchObj = {
        type: "addNewVendorCode",
        data,
      };

      if (JSON.stringify(state.prevReq) === JSON.stringify(fetchObj)) {
        return rejectWithValue("");
      }
      const resp = await dispatch(serverRequest(fetchObj));
      return resp.payload.data.error
        ? rejectWithValue(
            `Ошибка при добавлении данных на сервере\n${resp.payload.data.error.join(
              "\n"
            )}`
          )
        : resp.payload.data;
    } catch (error) {
      return rejectWithValue(
        "При проверке и отправке данных возникла ошибка :("
      );
    }
  }
);

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
