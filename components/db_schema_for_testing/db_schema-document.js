// Объект для проверки значений введённых пользователем
//  Поле: {                            / это же имя используется и в объектах
//    required: true,                     / обязательный или нет
//    maxlength: 3,                       / максимельная длина в символах
//    containsNumber: true,               / содержит число
//    description: "единицы измерения",   / описание (для формирования ошибок)
//    regularExp: "[0-9]+",               / регулярка с допустимыми символов (для вырезания лишних)

const documentsDbSchema = {
  name: {
    required: true,
    maxlength: 255,
    containsNumber: false,
    description: "название документа",
    regularExp: '[а-яё\\-+#№/()%:;*.,"\\d\\w\\s]+',
  },
  number: {
    required: false,
    maxlength: 10,
    containsNumber: false,
    description: "номер документа",
    regularExp: '[а-яё\\-+#№/()%:;*.,"\\d\\w\\s]+',
  },
  date: {
    required: true,
    maxlength: 21,
    containsNumber: false,
    description: "дата документа",
    regularExp: "^\\d{2}\\.\\d{2}\\.\\d{4}$",
  },
  notes: {
    required: false,
    maxlength: 380,
    containsNumber: false,
    description: "примечания",
    regularExp: '[а-яё\\-+#№/()%:;*.,?"\\d\\w\\s]*',
  },
};

module.exports = documentsDbSchema;
