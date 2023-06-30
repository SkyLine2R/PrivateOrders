/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const api = "alert";

const alert = createSlice({
  name: api,
  initialState: {
    title: "Предупреждение",
    questions: "",
    buttonOk: "Удалить",
    buttonCancel: "Отмена",
    id: null,
    api: "",
    type: "",
    modalWindowIsOpen: false,
  },

  reducers: {
    setModalWindowIsOpen: (state, { payload }) => {
      state.title = payload?.title ?? "Предупреждение";
      state.questions = payload?.questions ?? "";
      state.buttonOk = payload?.buttonOk ?? "Удалить";
      state.buttonCancel = payload?.buttonCancel ?? "Отмена";
      state.id = payload?.id ?? null;
      state.api = payload?.api ?? "";
      state.type = payload?.type ?? "";
      state.modalWindowIsOpen = !state.modalWindowIsOpen;
    },
  },
});
export const { setModalWindowIsOpen } = alert.actions;

export default alert.reducer;
