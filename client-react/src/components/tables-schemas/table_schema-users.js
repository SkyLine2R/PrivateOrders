// Объект для заполнения хедеров таблицы
//      headerName: "Ед. изм.",           / наименование столбца
//      width: 80,                        / минимальная ширина столбца
//      editable: false,                  / возможность редактирования в ячейке (пока не используется)
//      align: "center",                  / выравнивание
//    },
//    unitArr: ["м / хл.", "шт. / уп.", "м / уп."], / подстановочные данные вместо индекса БД (для Select’ов)
//  },

const usersSchemaTable = {
  login: {
    headerName: "Логин",
    flex: 0.7,
    editable: false,
  },
  name: {
    headerName: "Пользователь",
    flex: 1,
    editable: false,
  },
  accessLevel: {
    headerName: "Права доступа",
    flex: 1,
    editable: false,
    type: "number",
    align: "left",
    labels: [
      null,
      "Отключёна",
      "Только просмотр",
      "Редактирование",
      "Полный доступ",
      "Администратор",
    ],
  },
  createdAt: {
    headerName: "Зарегистрирован",
    flex: 0.5,
    editable: false,
  },
};

module.exports = usersSchemaTable;
