/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import serverRequest from "../serverRequest";
import fetchEntries from "../fetchEntries";
import sendNewEntryToDB from "../sendNewEntryToDB";

const users = createSlice({
  name: "user",
  initialState: {
    modalWindowUsersEditOpen: true,
    inputFields: { login: "", name: "", pass: "", accessLevel: 0 },
    usersArr: [],
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
    setModalWindowUsersEditOpen: (state) => {
      state.modalWindowUsersEditOpen = !state.modalWindowUsersEditOpen;
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
        state.usersArr = payload.data || [];
      })
      .addCase(sendNewEntryToDB.pending, (state) => {
        state.lastVendorCodeId = null;
      })

      .addCase(sendNewEntryToDB.fulfilled, (state, { payload }) => {
        console.log(payload.data);
        if (payload.api !== "users") return;
        state.modalWindowUsersEditOpen = false;
        state.inputFields = {
          login: "",
          name: "",
          pass: "",
          accessLevel: 0,
        };
        state.usersArr = [];
      });
  },
});

export const { changeValue, setModalWindowUsersEditOpen } = users.actions;

export default users.reducer;
