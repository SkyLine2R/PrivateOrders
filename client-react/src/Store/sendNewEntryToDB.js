import { createAsyncThunk } from "@reduxjs/toolkit";
import testSendData from "../../../components/testing-data-from-input";
import serverRequest from "./serverRequest";

const sendNewEntryToDB = createAsyncThunk(
  "api/sendNewEntryToDB",
  async ({ dbSchema, api }, { getState, dispatch, rejectWithValue }) => {
    // уточнить необходимость try/catch, возможно нужно убрать
    // сделать выводы ошибок в слайсах если с сервера приходит ответ о дублирующейся записи (логин и т.п.)
    try {
      const { inputFields } = getState()[api];
      const prevReq = getState()[api].request.prevReq.fetchObj;

      const keys = Object.keys(dbSchema);
      // выберем, согласно схемы, из State ключи новой записи,
      // которые нужно отправиться в БД
      const objToSend = keys.reduce(
        (obj, key) => ({ ...obj, [key]: inputFields[key] }),
        {}
      );
      const data = testSendData(dbSchema, objToSend);

      if (data.error) {
        return rejectWithValue({
          api,
          error: `Данные не отправлены.\n${data.error}`,
        });
      }
      const fetchObj = {
        type: "add",
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
        : { api, data: resp.payload.data };
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      return rejectWithValue({
        api,
        error: "При проверке и отправке данных возникла непредвиденная ошибка.",
      });
    }
  }
);

export default sendNewEntryToDB;
