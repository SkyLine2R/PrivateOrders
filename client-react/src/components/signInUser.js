import testSendData from "../../../components/testing-data-from-input";
import dbSchema from "../../../components/users-db_schema";
import APP_URL from "./APP_URL";

const signInUser = async (user) => {
  try {
    const data = testSendData(
      { login: dbSchema.login, pass: dbSchema.pass },
      user
    );

    if (data.error) {
      throw data.error;
    }

    const response = await fetch(`${APP_URL}login`, {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Ошибка связи с сервером авторизации");

    const respData = await response.json();

    if (respData.error)
      throw new Error(`Отклонено сервером: ${respData.error}`);

    return { payload: respData };
  } catch (error) {
    return { error: `Ошибка при авторизации:\n${error.message}` };
  }
};
export default signInUser;
