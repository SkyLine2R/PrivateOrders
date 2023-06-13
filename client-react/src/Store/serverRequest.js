import { createAsyncThunk } from "@reduxjs/toolkit";
import fetchUrlAPI from "../components/apiUrl";

const serverRequest = createAsyncThunk(
  "api/serverRequest",
  async ({ fetchObj, api }, { rejectWithValue }) => {
    try {
      const response = await fetch(fetchUrlAPI + api, {
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
