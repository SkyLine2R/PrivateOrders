const usersDbSchema = {
  login: {
    required: true,
    maxlength: 15,
    containsNumber: false,
    description: "логин",
    regularExp: "[\\w\\-#/():.\\d\\s]+",
  },
  name: {
    required: true,
    maxlength: 40,
    containsNumber: false,
    description: "имя пользователя",
    regularExp: '[а-яё\\-/()."\\d\\w\\s]+',
  },
  pass: {
    required: true,
    maxlength: 15,
    containsNumber: false,
    description: "пароль",
    regularExp: '[\\~`!@$%^&*?|+/()#.,_=\\"\\d\\w\\s]+',
  },
  accessLevel: {
    required: true,
    maxlength: 1,
    containsNumber: true,
    min: 1,
    max: 5,
    description: "права доступа",
    regularExp: "\\d+",
  },
  /*   createdAt: {
    required: false,
    maxlength: 200,
    containsNumber: false,
    description: "дата регистрации",
    regularExp: '[а-яё\\-+#№/()%:;*.,?"\\d\\w\\s]*',
  }, */
};

module.exports = usersDbSchema;
