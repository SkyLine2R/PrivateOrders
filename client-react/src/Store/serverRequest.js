import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchUrlAPI = "http://localhost:3000/api/";

const serverRequest = createAsyncThunk(
  "api/serverRequest",
  async ({ fetchObj, page }, { rejectWithValue }) => {
    try {
      const response = await fetch(fetchUrlAPI + page, {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        referrerPolicy: "no-referrer",
        body: JSON.stringify(fetchObj),
      });
      if (!response.ok) {
        throw new Error("Ошибка получения данных с сервера");
      }
      const respData = await response.json();

      return { data: respData, prevReq: fetchObj };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export default serverRequest;
