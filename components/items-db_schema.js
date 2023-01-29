//Объект для проверки значений введённых пользователем - в таблицу 'items'
export { testFormForInputItem };

const testFormForInputItem = {
  vendorCode: {
    required: true,
    maxlength: 20,
    containsNumber: false,
    description: "артикул изделия",
    regularExp: 'а-яё\\-+/()#*.,"\\d\\w\\s',
  },
  itemName: {
    required: true,
    maxlength: 255,
    containsNumber: false,
    description: "наименование изделия",
    regularExp: 'а-яё\\-+#№/()%:;*.,"\\d\\w\\s',
  },
  unit: {
    required: true,
    maxlength: 15,
    containsNumber: false,
    description: "единицы измерения",
    regularExp: "а-яё.,/-\\d\\w\\s",
  },
  quantity: {
    required: true,
    maxlength: 5,
    containsNumber: true,
    min: 0.1,
    max: 5000,
    description: "количество единиц в хлысте или упаковке",
    regularExp: ".,/d",
  },
  notes: {
    required: false,
    maxlength: 200,
    containsNumber: false,
    description: "примечания",
    regularExp: 'а-яё\\-+#№/()%:;*.,"\\d\\w\\s',
  },
};
