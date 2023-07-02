import { createAsyncThunk } from "@reduxjs/toolkit";
import API_URL from "../../../Environment-setting/API_URL";
import { getSession, endSession } from "../components/session";

const serverRequest = createAsyncThunk(
  "api/serverRequest",
  async ({ fetchObj, api }, { getState, rejectWithValue }) => {
    try {
      const { accessToken } = getSession();

      const customer = getState().customers.currentId ?? null;

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
        body: JSON.stringify({ ...fetchObj, customer }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          endSession();
          throw new Error(
            "Истекло время авторизации в системе. Необходимо повторно войти в систему."
          );
        }
        if (response.status === 500) {
          throw new Error(response?.statusText);
        }
        throw new Error(
          (await response.json())?.error || "Сервер отклонил запрос"
        );
      }
      const respData = await response.json();

      return { data: respData, prevReq: fetchObj };
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      return rejectWithValue({ error: error.message });
    }
  }
);
export default serverRequest;
