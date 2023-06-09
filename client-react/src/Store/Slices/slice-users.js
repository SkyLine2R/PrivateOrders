/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import serverRequest from "../serverRequest";
import fetchEntries from "../fetchEntries";
import sendNewEntryToDB from "../sendNewEntryToDB";
import sendChangedEntryToDB from "../sendChangedEntryToDB";

const successSending = (state, payload) => {
  if (payload.api !== "users") return;
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
  name: "user",
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
      state.inputFields.accessLevel = payload?.accessLevel || 0;
      state.modalWindowIsOpen = !state.modalWindowIsOpen;
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
      .addCase(fetchEntries.fulfilled, (state, { payload }) => {
        if (payload.api !== "users") return;
        state.catalog = payload.data || [];
      })
      /*       .addCase(sendNewEntryToDB.pending, (state) => {
        state.lastVendorCodeId = null;
      }) */

      .addCase(sendNewEntryToDB.fulfilled, (state, { payload }) =>
        successSending(state, payload)
      )
      .addCase(sendChangedEntryToDB.fulfilled, (state, { payload }) =>
        successSending(state, payload)
      );
  },
});

export const { changeValue, setModalWindowIsOpen, setUserEditData } =
  users.actions;

export default users.reducer;
