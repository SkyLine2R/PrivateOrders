/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import fetchEntries from "../fetchEntries";
import serverRequest from "../serverRequest";
import sendEntryToDB from "../sendEntryToDB";

const api = "inStock";

const successSending = (state, payload) => {
  if (payload.api !== api) return;

  state.modalWindowIsOpen = false;
  state.inputFields = {
    vendorCode: {
      id: null,
      name: "",
      unit: "",
      quantity: "",
    },
    stock: {
      amount: null,
    },
    document: null,
    notes: "",
  };
};

const inStock = createSlice({
  name: api,
  initialState: {
    modalWindowIsOpen: false,
    inputFields: {
      vendorCodeId: null,
      vendorCode: "",
      vendorCodeName: "",
      vendorCodeQuantity: 6.8,
      vendorCodeUnit: "",
      stockId: null,
      stockColor: "0",
      stockAmount: 6.8,
      stockAmountInUnit: 1,
      document: null,
      notes: "",
    },
    catalog: [],
    request: {
      status: null,
      error: null,
      prevReq: {},
    },
  },

  reducers: {
    setModalWindowIsOpen: (store, { payload }) => {
      store.inputFields.vendorCodeId = payload?.id || null;
      store.inputFields.vendorCode = payload?.vendorCode || "";
      store.inputFields.vendorCodeName = payload?.name || "";
      store.inputFields.vendorCodeQuantity = payload?.quantity || null;
      store.inputFields.vendorCodeUnit = payload?.unit || null;
      store.inputFields.stockAmount = payload?.quantity || null;
      store.inputFields.notes = payload?.notes || "";
      store.modalWindowIsOpen = !store.modalWindowIsOpen;
    },

    changeValue: ({ inputFields }, { payload }) => {
      inputFields[payload.fieldId] = payload.value;
      if (payload.fieldId === "stockAmount")
        inputFields.stockAmountInUnit = (
          +payload.value / +inputFields.vendorCodeQuantity
        ).toFixed(3);
      if (payload.fieldId === "stockAmountInUnit")
        inputFields.stockAmount = (
          +payload.value * +inputFields.vendorCodeQuantity
        ).toFixed(3);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(serverRequest.pending, ({ request }, action) => {
        if (action.meta.arg.api !== api) return;
        request.prevReq = action.meta.arg;
        request.status = "loading";
        request.error = null;
      })

      .addCase(serverRequest.fulfilled, ({ request }, action) => {
        if (action.meta.arg.api !== api) return;
        request.status = "resolved";
      })

      .addCase(serverRequest.rejected, ({ request }, action) => {
        if (action.meta.arg.api !== api) return;
        request.status = "rejected";
        request.error = action.payload;
      })

      .addCase(fetchEntries.fulfilled, (state, { payload }) => {
        if (payload.api !== api) return;
        state.catalog = payload.data || [];
      })

      .addCase(sendEntryToDB.fulfilled, (state, { payload }) => {
        if (payload.api !== api) return;
        successSending(state, payload);
      });
  },
});

export const { setModalWindowIsOpen, changeValue } = inStock.actions;

export default inStock.reducer;
