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

const testFormForDocument = {
  documentDate: {
    required: true,
    maxlength: 6,
    containsNumber: false,
    description: "дата документа",
    regularExp: "^\\d{2}\\.\\d{2}\\.\\d{4}$",
    table: {
      headerName: "Дата",
      width: 150,
      editable: false,
      type: "date",
      align: "center",
    },
  },
  documentName: {
    required: true,
    maxlength: 255,
    containsNumber: false,
    description: "название документа",
    regularExp: '[а-яё\\-+#№/()%:;*.,"\\d\\w\\s]+',
    table: {
      headerName: "Документ",
      width: 900,
      editable: false,
    },
  },
  documentNumber: {
    required: false,
    maxlength: 6,
    containsNumber: true,
    description: "номер документа",
    regularExp: "[0-9]+",
    table: {
      headerName: "Номер",
      width: 100,
      editable: false,
      align: "center",
    },
  },

  createdBy: {
    required: true,
    maxlength: 3,
    containsNumber: true,
    description: "автор документа",
    regularExp: "[0-9]+",
    table: {
      headerName: "Создал",
      width: 200,
      editable: false,
    },
  },
  notes: {
    required: false,
    maxlength: 380,
    containsNumber: false,
    description: "примечания",
    regularExp: '[а-яё\\-+#№/()%:;*.,?"\\d\\w\\s]*',
    table: {
      headerName: "Примечания",
      width: 350,
      editable: false,
    },
  },
};

module.exports = testFormForDocument;
