import { createAsyncThunk } from "@reduxjs/toolkit";
import serverRequest from "./serverRequest";

const deleteEntryFromDB = createAsyncThunk(
  "api/deleteEntryFromDB",
  async ({ api, type }, { getState, dispatch, rejectWithValue }) => {
    try {
      const { id, params } = getState().alert;
      const prevReq = getState()[api].request.prevReq.fetchObj;

      if (!id) {
        return rejectWithValue({
          api,
          params,
          error: "Запись не удалена. Произошла ошибка.",
        });
      }
      const fetchObj = {
        type,
        data: { id },
      };
      if (JSON.stringify(prevReq) === JSON.stringify(fetchObj)) {
        return rejectWithValue();
      }

      const resp = await dispatch(serverRequest({ fetchObj, api }));

      return resp.payload?.error
        ? rejectWithValue({
            api,
            type,
            error: `Отклонено. Сообщение сервера:\n${resp.payload.error}`,
          })
        : { api, type, data: resp.payload.data };
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      return rejectWithValue({
        api,
        type,
        error: "При проверке и отправке данных возникла программная ошибка.",
      });
    }
  }
);

export default deleteEntryFromDB;
