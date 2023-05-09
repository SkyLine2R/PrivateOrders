import { createAsyncThunk } from "@reduxjs/toolkit";
import serverRequest from "./serverRequest";

const fetchVendorCodes = createAsyncThunk(
  "api/fetchVendorCodes",
  async (_, { getState, dispatch, rejectWithValue, rejected }) => {
    // запрос с фильтром оставляем для запроса только буквы и цифры,
    // остальное заменяем на маску "любые символы - "%"
    // если введены данные в два поля (артикул и название) - фильтр не используем
    const { vendorCode, itemName, prevReq } = getState();
    if (vendorCode && itemName) return rejected();

    const fetchObj = {
      type: "getFilteredVendorCodes",
      data: {
        table: "items",
        column: `${vendorCode ? "vendorCode" : "itemName"}`,
        string: vendorCode || itemName || "",
      },
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