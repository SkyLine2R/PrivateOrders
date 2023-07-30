/* eslint-disable no-nested-ternary */
/* eslint-disable default-param-last */
import { createAsyncThunk } from "@reduxjs/toolkit";
import serverRequest from "./serverRequest";

const fetchEntries = createAsyncThunk(
  "api/fetchEntries",
  async (
    { api, type = "getAll" },
    { getState, dispatch, rejectWithValue, rejected }
  ) => {
    const fetchObj = {
      type,
    };

    const { inputFields, request } = getState()[api];
    const { prevReq } = request;

    if (api === "vendorCodes" && type === "getFiltered") {
      const { vendorCode, name, notes } = inputFields;
      fetchObj.data = {
        column: `${vendorCode ? "vendorCode" : name ? "name" : "notes"}`,
        string: vendorCode || name || notes || "",
      };
    }

    if (type === "getQuickFilter") {
      const { columns, quickSearchString } = getState().quickSearch.inputFields;
      const columnsArr = columns.map((item) => item.name);
      fetchObj.data = { columns: columnsArr, string: quickSearchString };
    }

    if (JSON.stringify(prevReq) === JSON.stringify(fetchObj)) {
      return rejected();
    }

    const resp = await dispatch(serverRequest({ fetchObj, api }));

    return resp.payload?.error
      ? rejectWithValue({ error: resp.payload.error })
      : { api, data: resp.payload.data };
  }
);

export default fetchEntries;
