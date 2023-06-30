const str = {
  new: {
    vendorCodes: "Артикул",
    users: "Пользователь",
    customers: "Склад заказчика",
    colors: "Цвет",
    documentsInStock: "Документ",
    documentsOutStock: "Документ",
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
    result: "удалён из БД.",
  },
};

const generateSuccessText = ({ api, type, data }) => {
  console.log(type);
  const name = data.login ?? data.vendorCode ?? data.name;
  return `${str[type][api]}${name ? ` "${name}" ` : " "}${str[type].result}`;
};

module.exports = generateSuccessText;
