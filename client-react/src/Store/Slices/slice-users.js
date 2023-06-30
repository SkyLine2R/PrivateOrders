/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import serverRequest from "../serverRequest";
import fetchEntries from "../fetchEntries";
import sendEntryToDB from "../sendEntryToDB";

const api = "users";

const successSending = (state, payload) => {
  if (payload.api !== api) return;
  state.modalWindowIsOpen = false;
  state.inputFields = {
    id: null,
    login: "",
    name: "",
    pass: "",
    accessLevel: 0,
  };
};

const users = createSlice({
  name: api,
  initialState: {
    modalWindowIsOpen: false,
    inputFields: { id: null, login: "", name: "", pass: "", accessLevel: 0 },
    catalog: [],
    request: {
      status: null,
      error: null,
      prevReq: {},
    },
  },
  reducers: {
    changeValue: ({ inputFields }, { payload }) => {
      inputFields[payload.fieldId] = payload.value;
    },
    setModalWindowIsOpen: (state, { payload }) => {
      state.inputFields.id = payload?.id || 0;
      state.inputFields.login = payload?.login || "";
      state.inputFields.name = payload?.name || "";
      state.inputFields.pass = "";
      state.inputFields.accessLevel = payload?.accessLevel || 0;
      state.modalWindowIsOpen = !state.modalWindowIsOpen;
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
      .addCase(sendEntryToDB.pending, (state, action) => {
        if (action.meta.arg.api !== api) return;
        state.lastVendorCodeId = null;
      })

      .addCase(sendEntryToDB.fulfilled, (state, action) => {
        if (action.meta.arg.api !== api) return;
        successSending(state, action.payload);
      });
  },
});

export const { changeValue, setModalWindowIsOpen, setUserEditData } =
  users.actions;

export default users.reducer;
