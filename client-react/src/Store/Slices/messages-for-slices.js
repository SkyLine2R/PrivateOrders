const str = {
  add: {
    vendorCodes: "Артикул",
    users: "Пользователь",
    customers: "Склад заказчика",
    colors: "Цвет",
    documentsInStock: "Документ",
    documentsOutStock: "Документ",
    result: "добавлен в базу данных.",
  },
  edit: {
    vendorCodes: "Данные артикула",
    users: "Данные пользователя",
    customers: "Данные склада",
    colors: "Данные цвета",
    documentsInStock: "Реквизиты документа",
    documentsOutStock: "Реквизиты документа",
    result: "обновлены.",
  },
  del: {
    vendorCodes: "Артикул",
    users: "Пользователь",
    customers: "Склад",
    colors: "Цвет",
    documentsInStock: "Документ",
    documentsOutStock: "Документ",
    result: "удалён из базы данных.",
  },
  changePass: {
    users: "Пароль пользователя",
    result: "обновлён.",
  },
  disableUser: {
    users: "Аккаунт пользователя",
    result: "отключён.",
  },
};

const generateSuccessText = ({ api, type, data }) => {
  const name = data.login ?? data.vendorCode ?? data.name;
  return `${str[type][api]}${name ? ` "${name}" ` : " "}${str[type].result}`;
};

module.exports = generateSuccessText;
