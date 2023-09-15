// запись об успешной операции формируется из свойств str
// первое свойство - тип операции
// второе свойство - API операции
// result - как итог операции
// Если есть строка с данными как имя, артикул и т.п.
// она также подставляется в итоговую фразу

const str = {
  add: {
    vendorCodes: "Артикул",
    users: "Пользователь",
    customers: "Склад заказчика",
    colors: "Цвет",
    documentsInStock: "Документ",
    documentsOutStock: "Документ",
    inStock: "Материал",
    outStock: "Материал",
    result: "добавлен в базу данных.",
  },
  edit: {
    vendorCodes: "Данные артикула",
    users: "Данные пользователя",
    customers: "Данные склада",
    colors: "Данные цвета",
    documentsInStock: "Реквизиты документа",
    documentsOutStock: "Реквизиты документа",
    inStock: "Данные о поступлении",
    outStock: "Данные о поступлении",
    result: "обновлены.",
  },
  del: {
    vendorCodes: "Артикул",
    users: "Пользователь",
    customers: "Склад",
    colors: "Цвет",
    documentsInStock: "Документ",
    documentsOutStock: "Документ",
    inStock: "Материал",
    outStock: "Материал",
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
