/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import fetchEntries from "../fetchEntries";
import serverRequest from "../serverRequest";
import sendEntryToDB from "../sendEntryToDB";

const api = "vendorCodes";

const successSending = (state, payload) => {
  state.lastVendorCodeId = payload.data.id;
  state.modalWindowIsOpen = false;
  state.inputFields = {
    vendorCode: "",
    name: "",
    unit: 1,
    quantity: 0,
    notes: "",
  };
};

const vendorCodes = createSlice({
  name: api,
  initialState: {
    modalWindowIsOpen: false,
    inputFields: {
      id: null,
      vendorCode: "",
      name: "",
      unit: 1,
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
      state.inputFields.name = payload?.name || "";
      state.inputFields.unit = payload?.unit || 1;
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
        if (JSON.stringify(state.catalog) === JSON.stringify(payload.data))
          return;
        state.catalog = payload.data || [];
      })

      .addCase(sendEntryToDB.pending, (state, { payload }) => {
        if (payload?.api !== api) return;
        state.lastVendorCodeId = null;
      })

      .addCase(sendEntryToDB.fulfilled, (state, { payload }) => {
        if (payload.api !== api) return;
        successSending(state, payload);
      });
  },
});

export const { setModalWindowIsOpen, changeValue, copyPasteValue } =
  vendorCodes.actions;

export default vendorCodes.reducer;
