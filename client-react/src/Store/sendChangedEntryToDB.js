import { createAsyncThunk } from "@reduxjs/toolkit";
import testSendData from "../../../components/testing-data-from-input";
import serverRequest from "./serverRequest";

const sendChangedEntryToDB = createAsyncThunk(
  "api/sendEditingEntryToDB",
  async ({ dbSchema, api, type }, { getState, dispatch, rejectWithValue }) => {
    try {
      const { inputFields } = getState()[api];
      const prevReq = getState()[api].request.prevReq.fetchObj;

      const keys = Object.keys(dbSchema);
      // подберём, согласно схемы, из State ключи объекта
      // которые должны отправиться в базу
      const objToSend = keys.reduce(
        (obj, key) => ({ ...obj, [key]: inputFields[key] }),
        {}
      );
      const data = testSendData(dbSchema, objToSend);

      if (data.error) {
        return rejectWithValue({
          api,
          error: `Данные не изменены.\n${data.error}`,
        });
      }
      const fetchObj = {
        type,
        data,
      };
      if (JSON.stringify(prevReq) === JSON.stringify(fetchObj)) {
        return rejectWithValue();
      }
      const resp = await dispatch(serverRequest({ fetchObj, api }));

      return resp.payload?.error
        ? rejectWithValue({
            api,
            error: `Отклонено. Сообщение сервера:\n${resp.payload.error}`,
          })
        : { api, type, data: resp.payload.data };
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

export default sendChangedEntryToDB;
