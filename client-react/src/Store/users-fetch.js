import { createAsyncThunk } from "@reduxjs/toolkit";
import serverRequest from "./serverRequest";

const fetchUsers = createAsyncThunk(
  "api/fetchUsers",
  async (_, { getState, dispatch, rejectWithValue, rejected }) => {
    /*     const { inputFields, request } = getState();
    const { vendorCode, itemName } = inputFields;
    const { prevReq } = request; */

    if (vendorCode && itemName) return rejected();

    const fetchObj = {
      type: "getAll",
    };

    const resp = await dispatch(serverRequest(fetchObj));
    return resp.payload.data.error
      ? rejectWithValue(resp.payload.error)
      : resp.payload;
  }
);

export default fetchUsers;
