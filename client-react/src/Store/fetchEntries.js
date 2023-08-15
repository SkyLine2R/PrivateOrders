/* eslint-disable no-nested-ternary */
/* eslint-disable default-param-last */
import { createAsyncThunk } from "@reduxjs/toolkit";
import serverRequest from "./serverRequest";

const fetchEntries = createAsyncThunk(
  "api/fetchEntries",
  async (
    { api, type = "getAll", columns, string },
    { getState, dispatch, rejectWithValue }
  ) => {
    const fetchObj = {
      type,
    };

    if (type !== "getAll") fetchObj.data = { columns, string };

    const { prevReq } = getState()[api].request;
    const { catalog } = getState()[api];

    // отмена запроса, если предыдущий ничего не вернул,
    // а в строке только дабавились символы
    if (
      string?.includes(prevReq.fetchObj?.data?.string) &&
      catalog.length === 0
    ) {
      return rejectWithValue("rejected");
    }
    // отмена дублирующегося запроса
    if (JSON.stringify(prevReq) === JSON.stringify(fetchObj)) {
      return rejectWithValue("rejected");
    }

    const resp = await dispatch(serverRequest({ fetchObj, api }));

    return resp.payload?.error
      ? rejectWithValue({ error: resp.payload.error })
      : { api, data: resp.payload.data };
  }
);

export default fetchEntries;
