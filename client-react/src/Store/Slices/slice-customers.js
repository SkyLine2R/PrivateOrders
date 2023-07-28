/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import fetchEntries from "../fetchEntries";
import serverRequest from "../serverRequest";
import sendEntryToDB from "../sendEntryToDB";

const api = "customers";

const successSending = (state, payload) => {
  if (payload.api !== api) return;

  state.modalWindowIsOpen = false;
  state.inputFields = {
    id: null,
    name: "",
    notes: "",
  };
};

const customers = createSlice({
  name: api,
  initialState: {
    currentId: 1, // для отладки. Заменить на null
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
    setCurrentCustomerId: (state, { payload }) => {
      state.currentId = payload;
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

export const { setModalWindowIsOpen, changeValue, setCurrentCustomerId } =
  customers.actions;

export default customers.reducer;
