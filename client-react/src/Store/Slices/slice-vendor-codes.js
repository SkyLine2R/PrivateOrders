/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import fetchVendorCodes from "../fetchVendorCodes";
import serverRequest from "../serverRequest";
import sendNewEntryToDB from "../sendNewEntryToDB";

const vendorCodes = createSlice({
  name: "vendorCodes",
  initialState: {
    modalWindowVendorCodeOpen: false,
    inputFields: {
      vendorCode: "",
      itemName: "",
      unit: "0",
      quantity: "1",
      notes: "",
    },
    vendorCodesArr: [],
    request: {
      status: null,
      error: null,
      prevReq: {},
    },
    lastVendorCodeId: null,
  },

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(serverRequest.pending, ({ request }, action) => {
        request.prevReq = action.meta.arg;
        request.status = "loading";
        request.error = null;
      })

      .addCase(serverRequest.fulfilled, ({ request }) => {
        request.status = "resolved";
      })

      .addCase(serverRequest.rejected, ({ request }, { payload }) => {
        request.status = "rejected";
        request.error = payload;
      })

      .addCase(fetchVendorCodes.fulfilled, (state, { payload }) => {
        state.vendorCodesArr = payload.data || [];
      })

      .addCase(sendNewEntryToDB.pending, (state) => {
        state.lastVendorCodeId = null;
      })
      .addCase(sendNewEntryToDB.fulfilled, (state, { payload }) => {
        if (payload.api !== "vendorCodes") return;
        [state.lastVendorCodeId] = [...payload.data.id];
        state.modalWindowVendorCodeOpen = false;
        state.inputFields = {
          vendorCode: "",
          itemName: "",
          unit: 0,
          quantity: 0,
          notes: "",
        };
        state.vendorCodesArr = [];
      });
  },
});

export const { setModalWindowVendorCodeOpen, changeValue, copyPasteValue } =
  vendorCodes.actions;

export default vendorCodes.reducer;
