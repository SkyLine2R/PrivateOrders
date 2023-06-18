import { createAsyncThunk } from "@reduxjs/toolkit";
import testSendData from "../../../components/testing-data-from-input";
import serverRequest from "./serverRequest";

const sendNewEntryToDB = createAsyncThunk(
  "api/sendNewEntryToDB",
  async ({ dbSchema, api }, { getState, dispatch, rejectWithValue }) => {
    try {
      console.log(dbSchema);
      console.log(api);
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
          error: `Данные не отправлены.\n${data.error.join("\n")}`,
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

      return resp.payload?.data?.error
        ? rejectWithValue({
            api,
            error: `Отклонено. Сообщение сервера:\n${
              Array.isArray(resp.payload.data.error)
                ? resp.payload.data.error.join("\n")
                : resp.payload.data.error
            }`,
          })
        : { api, data: resp.payload.data };
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      return rejectWithValue({
        api,
        error:
          "При проверке и отправке данных возникла непредвиденная ошибка :(",
      });
    }
  }
);

export default sendNewEntryToDB;
