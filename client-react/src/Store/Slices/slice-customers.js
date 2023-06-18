/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import fetchEntries from "../fetchEntries";
// import serverRequest from "../serverRequest";
import sendNewEntryToDB from "../sendNewEntryToDB";
import sendChangedEntryToDB from "../sendChangedEntryToDB";

const successSending = (state, payload) => {
  if (payload.api !== "customers") return;

  state.modalWindowIsOpen = false;
  state.inputFields = {
    id: null,
    name: "",
    notes: "",
  };
};

const customers = createSlice({
  name: "customers",
  initialState: {
    modalWindowIsOpen: false,
    inputFields: {
      id: null,
      name: "",
      notes: "",
    },
    catalog: [],
    request: {
      status: null,
      error: null,
      prevReq: {},
    },
    workCustomer: null,
  },

  reducers: {
    setModalWindowIsOpen: (state, { payload }) => {
      state.inputFields.id = payload?.id || "";
      state.inputFields.name = payload?.name || "";
      state.inputFields.notes = payload?.notes || "";
      state.modalWindowIsOpen = !state.modalWindowIsOpen;
    },

    changeValue: ({ inputFields }, { payload }) => {
      inputFields[payload.fieldId] = payload.value;
    },
  },

  extraReducers: (builder) => {
    builder
      /*       .addCase(serverRequest.pending, ({ request }, action) => {
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
      }) */

      .addCase(fetchEntries.fulfilled, (state, { payload }) => {
        if (payload.api !== "customers") return;
        state.catalog = payload.data || [];
      })

      .addCase(sendNewEntryToDB.fulfilled, (state, { payload }) => {
        if (payload.api !== "customers") return;
        successSending(state, payload);
      })

      .addCase(sendChangedEntryToDB.fulfilled, (state, { payload }) => {
        if (payload.api !== "customers") return;
        successSending(state, payload);
      });
  },
});

export const { setModalWindowIsOpen, changeValue } = customers.actions;

export default customers.reducer;
