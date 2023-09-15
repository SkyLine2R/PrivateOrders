/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const api = "quickSearch";

const defaultInputFields = {
  quickSearchString: "",
  tables: [],
  columns: [],
};

const quickSearch = createSlice({
  name: api,
  initialState: {
    inputFields: defaultInputFields,
  },
  reducers: {
    changeValue: ({ inputFields }, { payload }) => {
      inputFields[payload.fieldId] = payload.value;
    },
  },
});

export const { changeValue } = quickSearch.actions;

export default quickSearch.reducer;
