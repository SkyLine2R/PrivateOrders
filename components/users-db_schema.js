const testFormForUsers = {
  login: {
    required: true,
    maxlength: 15,
    containsNumber: false,
    description: "логин",
    regularExp: "[\\w\\-#/():.\\d\\s]+",
    table: {
      headerName: "Логин",
      width: 120,
      editable: false,
    },
  },
  name: {
    required: true,
    maxlength: 40,
    containsNumber: false,
    description: "имя пользователя",
    regularExp: '[а-яё\\-/()."\\d\\w\\s]+',
    table: {
      headerName: "Пользователь",
      width: 330,
      editable: false,
    },
  },
  pass: {
    required: true,
    maxlength: 15,
    containsNumber: false,
    description: "пароль",
    regularExp: '[\\~`!@$%^&*?|+/()#.,_=\\"\\d\\w\\s]+',
    table: {
      headerName: "Пароль",
      width: 0,
      editable: false,
    },
  },
  accessLevel: {
    required: true,
    maxlength: 1,
    containsNumber: true,
    min: 1,
    max: 5,
    description: "права доступа",
    regularExp: "\\d+",
    table: {
      headerName: "Права доступа",
      width: 150,
      editable: false,
      type: "number",
      align: "left",
    },
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
    required: false,
    maxlength: 200,
    containsNumber: false,
    description: "дата регистрации",
    regularExp: '[а-яё\\-+#№/()%:;*.,?"\\d\\w\\s]*',
    table: {
      headerName: "Зарегистрирован",
      width: 150,
      editable: false,
    },
  },
};

module.exports = testFormForUsers;
