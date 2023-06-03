import { createAsyncThunk } from "@reduxjs/toolkit";
import serverRequest from "./serverRequest";

const fetchEntries = createAsyncThunk(
  "api/fetchEntries",
  async (api, { dispatch, rejectWithValue }) => {
    const fetchObj = {
      type: "getAll",
    };
    const resp = await dispatch(serverRequest({ fetchObj, api }));

    return resp.payload.data.error
      ? rejectWithValue(resp.payload.error)
      : { api, data: resp.payload.data };
  }
);

export default fetchEntries;
