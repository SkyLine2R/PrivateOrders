/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import serverRequest from "../serverRequest";
import fetchUsers from "../fetchUsers";

const users = createSlice({
  name: "user",
  initialState: {
    modalWindowUsersEditOpen: false,
    inputFields: { login: "", name: "", pass: "", privelegies: null },
    usersArr: [],
    request: {
      status: null,
      error: null,
      prevReq: {},
    },
  },
  reducers: {
    setUserName: (state, action) => {
      state.name = action.payload;
    },
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

      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        state.usersArr = payload.data || [];
      });

    /*       .addCase(sendNewVendorCode.pending, (state) => {
        state.lastVendorCodeId = null;
      })

      .addCase(sendNewVendorCode.fulfilled, (state, { payload }) => {
        [state.lastVendorCodeId] = [...payload.id];
        state.modalWindowVendorCodeOpen = false;
        state.inputFields = {
          vendorCode: "",
          itemName: "",
          unit: 0,
          quantity: 0,
          notes: "",
        };
        state.vendorCodesArr = [];
      } ); */
  },
});

export const { changeValue, setUserName, setModalWindowUsersEditOpen } =
  users.actions;

export default users.reducer;
