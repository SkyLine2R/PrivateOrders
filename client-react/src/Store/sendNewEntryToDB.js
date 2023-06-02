import { createAsyncThunk } from "@reduxjs/toolkit";
import testSendData from "../../../components/testing-data-from-input";
import serverRequest from "./serverRequest";

const sendNewEntryToDB = createAsyncThunk(
  "api/sendNewEntryToDB",
  async ({ dbSchema, api }, { getState, dispatch, rejectWithValue }) => {
    // отправка нового пользователя для записи в БД
    try {
      const { inputFields } = getState()[api];
      const { prevReq } = getState()[api].request;

      const keys = Object.keys(dbSchema);

      // подберём согласно схемы из State ключи нового артикула,
      // которые должны отправиться в базу
      const objToSend = keys.reduce(
        (obj, key) => ({ ...obj, [key]: inputFields[key] }),
        {}
      );
      const data = testSendData(dbSchema, objToSend);

      if (data.error) {
        return rejectWithValue({
          api,
          data: `Данные не отправлены.\n${data.error.join("\n")}`,
        });
      }

      const fetchObj = {
        type: "add",
        data,
      };

      if (JSON.stringify(prevReq) === JSON.stringify(fetchObj)) {
        return rejectWithValue("");
      }

      const resp = await dispatch(serverRequest({ fetchObj, api }));
      return resp.payload.data.error
        ? rejectWithValue({
            api,
            data: `Ошибка на сервере при добавлении данных\n${resp.payload.data.error.join(
              "\n"
            )}`,
          })
        : { api, data: resp.payload.data };
    } catch (error) {
      return rejectWithValue({
        api,
        data: "При проверке и отправке данных возникла непредвиденная ошибка :(",
      });
    }
  }
);

export default sendNewEntryToDB;
