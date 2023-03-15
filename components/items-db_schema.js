// Объект для заполнения хедеров таблицы и проверки значений введённых пользователем (таблица и добавление новых артикулов)
// export { testFormForInputItem };
// eslint-disable-next-line no-multi-assign, no-undef
module.exports = testFormForInputItem = {
  vendorCode: {
    required: true,
    maxlength: 20,
    containsNumber: false,
    description: "артикул изделия",
    regularExp: 'а-яё\\-+/()#*.,"\\d\\w\\s',
    table: {
      headerName: "Артикул",
      width: 90,
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
      width: 330,
      editable: false,
    },
  },
  unit: {
    required: true,
    maxlength: 10,
    description: "единицы измерения",
    regularExp: "а-яё.,/-\\d\\w\\s",
    table: {
      headerName: "Ед. изм.",
      width: 80,
      editable: false,
      align: "center",
    },
    unitArr: ["м / хл.", "шт. / уп.", "м / уп."],
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
    maxlength: 180,
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
