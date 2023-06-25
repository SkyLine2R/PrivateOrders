// Объект для проверки значений введённых пользователем
//  Поле БД: {                            / это же имя используется и в объектах
//    required: true,                     / обязательный или нет
//    maxlength: 3,                       / максимельная длина в символах
//    containsNumber: true,               / содержит число
//    description: "единицы измерения",   / описание (для формирования ошибок)
//    regularExp: "[0-9]+",               / регулярка с допустимыми символов (для вырезания лишних)

const documentsDbSchema = {
  documentDate: {
    required: true,
    maxlength: 6,
    containsNumber: false,
    description: "дата документа",
    regularExp: "^\\d{2}\\.\\d{2}\\.\\d{4}$",
  },
  documentName: {
    required: true,
    maxlength: 255,
    containsNumber: false,
    description: "название документа",
    regularExp: '[а-яё\\-+#№/()%:;*.,"\\d\\w\\s]+',
  },
  documentNumber: {
    required: false,
    maxlength: 6,
    containsNumber: true,
    description: "номер документа",
    regularExp: "[0-9]+",
  },
  notes: {
    required: false,
    maxlength: 380,
    containsNumber: false,
    description: "примечания",
    regularExp: '[а-яё\\-+#№/()%:;*.,?"\\d\\w\\s]*',
  },
  createdBy: {
    required: true,
    maxlength: 3,
    containsNumber: true,
    description: "автор документа",
    regularExp: "[0-9]+",
  },
};

module.exports = documentsDbSchema;
