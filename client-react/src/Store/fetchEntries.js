/* eslint-disable no-nested-ternary */
/* eslint-disable default-param-last */
import { createAsyncThunk } from "@reduxjs/toolkit";
import serverRequest from "./serverRequest";

const fetchEntries = createAsyncThunk(
  "api/fetchEntries",
  async (
    { api, type = "getAll", columns, string },
    { getState, dispatch, rejectWithValue, rejected }
  ) => {
    const fetchObj = {
      type,
    };

    if (type !== "getAll") fetchObj.data = { columns, string };

    const { prevReq } = getState()[api].request;

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
