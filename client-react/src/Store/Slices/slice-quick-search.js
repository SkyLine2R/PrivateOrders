/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import {
  selectTables,
  selectColumns,
} from "../../components/quickSearchFilterArr";

const api = "quickSearch";

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
});

export const { changeValue } = quickSearch.actions;

export default quickSearch.reducer;
