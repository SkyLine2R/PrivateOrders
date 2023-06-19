/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import fetchVendorCodes from "../fetchVendorCodes";
import fetchEntries from "../fetchEntries";
import serverRequest from "../serverRequest";
import sendNewEntryToDB from "../sendNewEntryToDB";
import sendChangedEntryToDB from "../sendChangedEntryToDB";

const successSending = (state, payload) => {
  if (payload.api !== "vendorCodes") return;

  state.lastVendorCodeId = payload.data.id;
  state.modalWindowIsOpen = false;
  state.inputFields = {
    vendorCode: "",
    itemName: "",
    unit: 0,
    quantity: 0,
    notes: "",
  };
};

const vendorCodes = createSlice({
  name: "vendorCodes",
  initialState: {
    modalWindowIsOpen: false,
    inputFields: {
      id: null,
      vendorCode: "",
      itemName: "",
      unit: "0",
      quantity: "1",
      notes: "",
    },
    catalog: [],
    request: {
      status: null,
      error: null,
      prevReq: {},
    },
    lastVendorCodeId: null,
  },

  reducers: {
    setModalWindowIsOpen: (state, { payload }) => {
      state.inputFields.id = payload?.id || "";
      state.inputFields.vendorCode = payload?.vendorCode || "";
      state.inputFields.itemName = payload?.itemName || "";
      state.inputFields.unit = payload?.unit || 0;
      state.inputFields.quantity = payload?.quantity || 1;
      state.inputFields.notes = payload?.notes || "";
      state.modalWindowIsOpen = !state.modalWindowIsOpen;
    },

    changeValue: ({ inputFields }, { payload }) => {
      inputFields[payload.fieldId] = payload.value;
    },

    copyPasteValue: ({ catalog, inputFields }, { payload }) => {
      inputFields[payload.fieldId] = catalog.find(
        (item) => item.id === payload.id
      )[payload.fieldId];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(serverRequest.pending, ({ request }, action) => {
        if (action.meta.arg.api !== "vendorCodes") return;
        request.prevReq = action.meta.arg;
        request.status = "loading";
        request.error = null;
      })

      .addCase(serverRequest.fulfilled, ({ request }, action) => {
        if (action.meta.arg.api !== "vendorCodes") return;
        request.status = "resolved";
      })

      .addCase(serverRequest.rejected, ({ request }, action) => {
        if (action.meta.arg.api !== "vendorCodes") return;
        request.status = "rejected";
        request.error = action.payload;
      })

      .addCase(fetchVendorCodes.fulfilled, (state, action) => {
        state.catalog = action.payload.data || [];
      })
      .addCase(fetchEntries.fulfilled, (state, { payload }) => {
        if (payload.api !== "vendorCodes") return;
        state.catalog = payload.data || [];
      })

      .addCase(sendNewEntryToDB.pending, (state, { payload }) => {
        if (payload?.api !== "vendorCodes") return;
        state.lastVendorCodeId = null;
      })

      .addCase(sendNewEntryToDB.fulfilled, (state, { payload }) => {
        if (payload.api !== "vendorCodes") return;
        successSending(state, payload);
      })

      .addCase(sendChangedEntryToDB.fulfilled, (state, { payload }) => {
        if (payload.api !== "vendorCodes") return;
        successSending(state, payload);
      });
  },
});

export const { setModalWindowIsOpen, changeValue, copyPasteValue } =
  vendorCodes.actions;

export default vendorCodes.reducer;
