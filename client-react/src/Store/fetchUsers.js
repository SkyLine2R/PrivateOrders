import { createAsyncThunk } from "@reduxjs/toolkit";
import serverRequest from "./serverRequest";

const fetchUsers = createAsyncThunk(
  "api/fetchUsers",
  async (_, { dispatch, rejectWithValue }) => {
    const fetchObj = {
      type: "getAll",
    };
    const resp = await dispatch(serverRequest({ fetchObj, api: "users" }));
    return resp.payload.data.error
      ? rejectWithValue(resp.payload.error)
      : resp.payload;
  }
);

export default fetchUsers;
