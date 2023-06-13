import testSendData from "../../../components/testing-data-from-input";
import serverRequest from "./serverRequest";
import dbSchema from "../../../components/users-db_schema";

/* export default async function signInUser({ login, pass }) {
  const fetchObj = {
    type: "login",
    data: {
      login,
      pass,
    },
  };
} */
const signInUser = async (user) => {
  try {
    /* sendChangedEntryToDB({
  dbSchema: { id: null, accessLevel: dbSchema.accessLevel },
  api: "users",
  type: "disableUser",
}); */

    const data = testSendData(
      { login: dbSchema.login, pass: dbSchema.pass },
      objToSend
    );

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
      error: "При проверке и отправке данных возникла непредвиденная ошибка :(",
    });
  }
};
export default signInUser;
