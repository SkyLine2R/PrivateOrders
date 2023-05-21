import { createAsyncThunk } from "@reduxjs/toolkit";
import serverRequest from "../Store/serverRequest";

const fetchVendorCodes = createAsyncThunk(
  "api/fetchUsers",
  async (_, { getState, dispatch, rejectWithValue, rejected }) => {
    // запрос с фильтром оставляем для запроса только буквы и цифры,
    // остальное заменяем на маску "любые символы - "%"
    // если введены данные в два поля (артикул и название) - фильтр не используем
    const { prevReq } = getState().request;

    const fetchObj = {
      type: "getAllUsers",
    };
    if (JSON.stringify(prevReq) === JSON.stringify(fetchObj)) {
      return rejected();
    }
    const resp = await dispatch(serverRequest(fetchObj));
    return resp.payload.data.error
      ? rejectWithValue(resp.payload.error)
      : resp.payload;
  }
);

export default fetchVendorCodes;
