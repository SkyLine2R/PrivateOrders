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

const vendorCodesDbSchema = {
  vendorCode: {
    required: true,
    maxlength: 20,
    containsNumber: false,
    description: "артикул изделия",
    regularExp: '[а-яё\\-+/()#*.,"\\d\\w\\s]+',
  },
  name: {
    required: true,
    maxlength: 255,
    containsNumber: false,
    description: "наименование изделия",
    regularExp: '[а-яё\\-+#№/()%:;*.,"\\d\\w\\s]+',
  },
  unit: {
    required: true,
    maxlength: 3,
    containsNumber: true,
    description: "единицы измерения",
    regularExp: "[0-9]+",
  },
  quantity: {
    required: true,
    maxlength: 6,
    containsNumber: true,
    min: 0.1,
    max: 5000,
    description: "количество единиц в хлысте или упаковке",
    regularExp: "\\d+[.,]?\\d{0,3}",
  },
  notes: {
    required: false,
    maxlength: 180,
    containsNumber: false,
    description: "примечания",
    regularExp: '[а-яё\\-+#№/()%:;*.,?"\\d\\w\\s]*',
  },
};

module.exports = vendorCodesDbSchema;
