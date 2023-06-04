/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import serverRequest from "../serverRequest";
import fetchEntries from "../fetchEntries";
import sendNewEntryToDB from "../sendNewEntryToDB";
import sendChangedEntryToDB from "../sendChangedEntryToDB";

const clearInputFieldsUsersState = (state) => {
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
    modalWindowUsersEditOpen: false,
    inputFields: { id: null, login: "", name: "", pass: "", accessLevel: 0 },
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
    setModalWindowUsersEditOpen: (state, { payload }) => {
      state.modalWindowUsersEditOpen = !state.modalWindowUsersEditOpen;
      // если окно открывалось для редактирования пользователя - очистить данные пользователя
      if (!state.modalWindowUsersEditOpen && payload === "editUser")
        clearInputFieldsUsersState(state);
    },
    setUserEditData: ({ inputFields }, { payload }) => {
      inputFields.id = payload.id;
      inputFields.login = payload.login;
      inputFields.name = payload.name;
      inputFields.accessLevel = payload.accessLevel;
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
      /*       .addCase(sendNewEntryToDB.pending, (state) => {
        state.lastVendorCodeId = null;
      }) */

      .addCase(sendNewEntryToDB.fulfilled, (state, { payload }) => {
        if (payload.api !== "users") return;
        state.modalWindowUsersEditOpen = false;
        clearInputFieldsUsersState(state);
        state.usersArr = [];
      })
      .addCase(sendChangedEntryToDB.fulfilled, (state, { payload }) => {
        if (payload.api !== "users") return;
        state.modalWindowUsersEditOpen = false;
        clearInputFieldsUsersState(state);
        state.usersArr = [];
      });
  },
});

export const { changeValue, setModalWindowUsersEditOpen, setUserEditData } =
  users.actions;

export default users.reducer;
