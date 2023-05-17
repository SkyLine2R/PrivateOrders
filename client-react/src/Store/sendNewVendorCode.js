import { createAsyncThunk } from "@reduxjs/toolkit";
import testSendData from "../../../components/testing-data-from-input";
import serverRequest from "./serverRequest";

const sendNewVendorCode = createAsyncThunk(
  "inputField/sendNewVendorCodes",
  async (dbSchema, { getState, dispatch, rejectWithValue }) => {
    // отправка нового артикула для записи в БД
    try {
      const { inputFields } = getState();
      const { prevReq } = getState().request;

      const keys = Object.keys(dbSchema);

      // подберём согласно схемы из State ключи нового артикула,
      // которые должны отправиться в базу
      const objVendorCode = keys.reduce(
        (obj, key) => ({ ...obj, [key]: inputFields[key] }),
        {}
      );
      const data = testSendData(dbSchema, objVendorCode);
      console.log(data);
      if (data.error) {
        return rejectWithValue(
          `Данные не отправлены.\n${data.error.join("\n")}`
        );
      }

      const fetchObj = {
        type: "addNewVendorCode",
        data,
      };

      if (JSON.stringify(prevReq) === JSON.stringify(fetchObj)) {
        return rejectWithValue("");
      }
      const resp = await dispatch(serverRequest(fetchObj));
      return resp.payload.data.error
        ? rejectWithValue(
            `Ошибка при добавлении данных на сервере\n${resp.payload.data.error.join(
              "\n"
            )}`
          )
        : resp.payload.data;
    } catch (error) {
      return rejectWithValue(
        "При проверке и отправке данных возникла ошибка :("
      );
    }
  }
);

export default sendNewVendorCode;
