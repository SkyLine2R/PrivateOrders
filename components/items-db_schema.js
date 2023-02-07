//Объект для проверки значений введённых пользователем - в таблицу 'items'
//export { testFormForInputItem };

module.exports = testFormForInputItem = {
  vendorCode: {
    required: true,
    maxlength: 20,
    containsNumber: false,
    description: "артикул изделия",
    regularExp: 'а-яё\\-+/()#*.,"\\d\\w\\s',
    table: {
      headerName: "Артикул",
      width: 100,
      editable: false,
    },
  },
  itemName: {
    required: true,
    maxlength: 255,
    containsNumber: false,
    description: "наименование изделия",
    regularExp: 'а-яё\\-+#№/()%:;*.,"\\d\\w\\s',
    table: {
      headerName: "Наименование",
      width: 280,
      editable: false,
    },
  },
  unit: {
    required: true,
    maxlength: 5,
    containsNumber: true,
    description: "единицы измерения",
    regularExp: "а-яё.,/-\\d\\w\\s",
    table: {
      headerName: "Ед. изм.",
      width: 100,
      editable: false,
    },
  },
  quantity: {
    required: true,
    maxlength: 5,
    containsNumber: true,
    min: 0.1,
    max: 5000,
    description: "количество единиц в хлысте или упаковке",
    regularExp: ".,\\d",
    table: {
      headerName: "Кол-во ед. в хл. | уп.",
      width: 150,
      editable: false,
      type: "number",
      align: "center",
    },
  },
  notes: {
    required: false,
    maxlength: 200,
    containsNumber: false,
    description: "примечания",
    regularExp: 'а-яё\\-+#№/()%:;*.,"\\d\\w\\s',
    table: {
      headerName: "Примечания",
      width: 150,
      editable: false,
    },
  },
};
