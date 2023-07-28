import { createAsyncThunk } from "@reduxjs/toolkit";
import serverRequest from "./serverRequest";

const fetchEntries = createAsyncThunk(
  "api/fetchEntries",
  async (api, { dispatch, rejectWithValue }, type = "getAll") => {
    const fetchObj = {
      type,
    };
    const resp = await dispatch(serverRequest({ fetchObj, api }));

    return resp.payload?.error
      ? rejectWithValue({ error: resp.payload.error })
      : { api, data: resp.payload.data };
  }
);

export default fetchEntries;
