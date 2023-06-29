/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import fetchEntries from "../fetchEntries";
import serverRequest from "../serverRequest";
import sendNewEntryToDB from "../sendNewEntryToDB";
import sendChangedEntryToDB from "../sendChangedEntryToDB";

const api = "alert";

/* const successSending = (state, payload) => {
  if (payload.api !== api) return;

  state.modalWindowIsOpen = false;
  state.inputFields = {
    id: null,
    name: "",
    notes: "",
  };
}; */

const alert = createSlice({
  name: api,
  initialState: {
    title: "",
    questions: "",
    modalWindowIsOpen: false,
    buttonOk: "Удалить",
    buttonCancel: "Отмена",
    result: null,
  },

  reducers: {
    setModalWindowIsOpen: (state, { payload }) => {
      state.title = payload?.title ?? "Предупреждение";
      state.questions = payload?.questions ?? "";
      state.buttonOk = payload?.buttonOk ?? "Удалить";
      state.buttonCancel = payload?.buttonCancel ?? "Отмена";
      state.result = payload?.result;
      state.modalWindowIsOpen = !state.modalWindowIsOpen;
    },

    /*     selectOk: (state, { payload }) => {
             state.action();
       
    }, */
  },
});
export const { setModalWindowIsOpen } = alert.actions;

export default alert.reducer;
