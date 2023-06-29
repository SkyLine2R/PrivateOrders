import { createAsyncThunk } from "@reduxjs/toolkit";
import serverRequest from "./serverRequest";

const deleteEntryFromDB = createAsyncThunk(
  "api/deleteEntryFromDB",
  async ({ api }, { getState, dispatch, rejectWithValue }) => {
    try {
      const { inputFields } = getState()[api].id;
      const prevReq = getState()[api].request.prevReq.fetchObj;

      const keys = ["id"];
      // подберём, согласно схемы, из State ключи объекта
      // которые должны отправиться в базу
      const data = keys.reduce(
        (obj, key) => ({ ...obj, [key]: inputFields[key] }),
        {}
      );
      if (!data.id) {
        return rejectWithValue({
          api,
          error: "Запись не удалена. Произошла ошибка.",
        });
      }
      const fetchObj = {
        type: "delete",
        data,
      };
      if (JSON.stringify(prevReq) === JSON.stringify(fetchObj)) {
        return rejectWithValue();
      }

      const resp = await dispatch(serverRequest({ fetchObj, api }));

      return resp.payload?.data?.error
        ? rejectWithValue({
            api,
            error: `Отклонено. Сообщение сервера:\n${resp.payload.data.error}`,
          })
        : { api, data: resp.payload.data };
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      return rejectWithValue({
        api,
        error: "При проверке и отправке данных возникла программная ошибка.",
      });
    }
  }
);

export default deleteEntryFromDB;
