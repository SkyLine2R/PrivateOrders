const testFormForUsers = {
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
  login: {
    required: true,
    maxlength: 15,
    containsNumber: false,
    description: "логин",
    regularExp: "[\\w\\-#/():.\\d\\s]+",
    table: {
      headerName: "Логин",
      width: 90,
      editable: false,
    },
  },
  pass: {
    required: true,
    maxlength: 15,
    containsNumber: false,
    description: "пароль",
    regularExp: '[\\-+/()#*.,_|\\"\\d\\w\\s]+',
    table: {
      headerName: "Пароль",
      width: 90,
      editable: false,
    },
  },
  privelegies: {
    required: true,
    maxlength: 3,
    containsNumber: true,
    min: 1,
    max: 999,
    description: "уровень доступа",
    regularExp: "\\d+",
    table: {
      headerName: "Уровень доступа",
      width: 50,
      editable: false,
      type: "number",
      align: "center",
    },
  },
  createdAt: {
    required: false,
    maxlength: 180,
    containsNumber: false,
    description: "дата создания",
    regularExp: '[а-яё\\-+#№/()%:;*.,?"\\d\\w\\s]*',
    table: {
      headerName: "Создан",
      width: 150,
      editable: false,
    },
  },
};

module.exports = testFormForUsers;
