// Объект для заполнения хедеров таблицы и проверки значений введённых пользователем (таблица и добавление новых артикулов)
//  Поле БД: {                            / это же имя используется и в объектах
//    required: true,                     / обязательный или нет
//    maxlength: 3,                       / максимельная длина в символах
//    containsNumber: true,               / содержит число
//    description: "единицы измерения",   / описание (для формирования ошибок)
//    regularExp: "[0-9]+",               / регулярка с допустимыми символов (для вырезания лишних)
//    table: {                            / настройки таблицы во фронте
//      headerName: "Ед. изм.",           / наименование столбца
//      width: 80,                        / минимальная ширина столбца
//      editable: false,                  / возможность редактирования в ячейке
//      align: "center",                  / выравнивание
//    },
//    unitArr: ["м / хл.", "шт. / уп.", "м / уп."], / подстановочные данные вместо индекса БД (для Select’ов)
//  },

const testFormForInputItem = {
  vendorCode: {
    required: true,
    maxlength: 20,
    containsNumber: false,
    description: "артикул изделия",
    regularExp: '[а-яё\\-+/()#*.,"\\d\\w\\s]+',
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
    regularExp: '[а-яё\\-+#№/()%:;*.,"\\d\\w\\s]+',
    table: {
      headerName: "Наименование",
      width: 330,
      editable: false,
    },
  },
  unit: {
    required: true,
    maxlength: 3,
    containsNumber: true,
    description: "единицы измерения",
    regularExp: "[0-9]+",
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
    maxlength: 6,
    containsNumber: true,
    min: 0.1,
    max: 5000,
    description: "количество единиц в хлысте или упаковке",
    regularExp: "\\d+[.,]?\\d{0,3}",
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
    regularExp: '[а-яё\\-+#№/()%:;*.,?"\\d\\w\\s]*',
    table: {
      headerName: "Примечания",
      width: 150,
      editable: false,
    },
  },
};

module.exports = testFormForInputItem;
