/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import {
  selectTables,
  selectColumns,
} from "../../components/quickSearchFilterArr";

import fetchEntries from "../fetchEntries";
import serverRequest from "../serverRequest";
import sendEntryToDB from "../sendEntryToDB";

const api = "quickSearch";

const successSending = (state, payload) => {
  if (payload.api !== api) return;

  /*   state.modalWindowIsOpen = false;
  state.inputFields = {
    id: null,
    name: "",
    notes: "",
  }; */
};

const quickSearch = createSlice({
  name: api,
  initialState: {
    inputFields: {
      quickSearchString: "",
      tables: selectTables,
      columns: selectColumns,
    },
    request: {
      status: null,
      error: null,
      prevReq: {},
    },
  },
  reducers: {
    changeValue: ({ inputFields }, { payload }) => {
      // console.log(inputFields[payload.fieldId]);
      inputFields[payload.fieldId] = payload.value;
    },
  },

  /* extraReducers: (builder) => {
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
    }, */
});

export const { changeValue } = quickSearch.actions;

export default quickSearch.reducer;
