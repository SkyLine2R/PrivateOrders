/* eslint-disable no-nested-ternary */
/* eslint-disable default-param-last */
import { createAsyncThunk } from "@reduxjs/toolkit";
import serverRequest from "./serverRequest";

const fetchEntries = createAsyncThunk(
  "api/fetchEntries",
  async (
    { api, type = "getAll", columns, string },
    { getState, dispatch, rejectWithValue }
  ) => {
    const fetchObj = {
      type,
    };
    console.log(`documents${api[0].toUpperCase() + api.slice(1)}`);

    // если обращение идёт со страницы с открытым документом
    // добавим ID документа к запросу
    if (api === "inStock" || api === "outStock")
      fetchObj.document =
        getState()?.[
          `documents${api[0].toUpperCase() + api.slice(1)}`
        ].activeTab;

    if (type !== "getAll") fetchObj.data = { columns, string };

    const { prevReq } = getState()[api].request;
    const { catalog } = getState()[api];

    // отмена дублирующегося запроса
    if (JSON.stringify(prevReq) === JSON.stringify(fetchObj)) {
      return rejectWithValue("rejected");
    }
    // отмена запроса, если предыдущий ничего не вернул,
    // а в строке только дабавились символы
    if (
      string?.includes(prevReq.fetchObj?.data?.string) &&
      catalog.length === 0
    ) {
      return rejectWithValue("rejected");
    }

    const resp = await dispatch(serverRequest({ fetchObj, api }));

    return resp.payload?.error
      ? rejectWithValue({ error: resp.payload.error })
      : { api, customer: resp.payload.customer, data: resp.payload.data };
  }
);

export default fetchEntries;
