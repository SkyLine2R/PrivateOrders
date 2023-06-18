import { createAsyncThunk } from "@reduxjs/toolkit";
import API_URL from "../components/API_URL";
import { getSession } from "../components/session";

const serverRequest = createAsyncThunk(
  "api/serverRequest",
  async ({ fetchObj, api }, { rejectWithValue }) => {
    try {
      const { accessToken } = getSession();

      if (!accessToken) {
        throw new Error("Отсутствует токен доступа для выполнения запроса.");
      }
      const response = await fetch(API_URL + api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `Bearer ${accessToken}`,
        },
        referrerPolicy: "no-referrer",
        body: JSON.stringify(fetchObj),
      });
      if (!response.ok) {
        throw new Error("Ошибка получения данных с сервера");
      }
      const respData = await response.json();

      if (respData.error) throw new Error(respData.error);

      return { data: respData, prevReq: fetchObj };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export default serverRequest;
