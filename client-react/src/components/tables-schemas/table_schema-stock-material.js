// Объект для заполнения хедеров таблицы
//      headerName: "Ед. изм.",           / наименование столбца
//      width: 80,                        / минимальная ширина столбца
//      editable: false,                  / возможность редактирования в ячейке (пока не используется)
//      align: "center",                  / выравнивание
//    },
//    unitArr: ["м / хл.", "шт. / уп.", "м / уп."], / подстановочные данные вместо индекса БД (для Select’ов)
//  },

const stockMaterialsSchemaTable = {
  vendorCode: {
    headerName: "Артикул",
    flex: 0.5,
    editable: false,
    type: "string",
  },
  name: {
    headerName: "Наименование",
    flex: 2,
    editable: false,
  },
  colorName: {
    headerName: "Цвет",
    flex: 0.5,
    editable: false,
  },
  amount: {
    headerName: "Кол-во",
    flex: 0.5,
    editable: false,
    type: "number",
  },
  amountName: {
    headerName: "ед.",
    flex: 0.3,
    editable: false,
    type: "string",
  },
  amountInUnits: {
    headerName: "Кол-во",
    flex: 0.5,
    editable: false,
    type: "number",
  },
  amountInUnitsName: {
    headerName: "ед.",
    flex: 0.3,
    editable: false,
    type: "string",
  },
  /*   notes: {
    headerName: "Примечания",
    flex: 1,
    editable: false,
  }, */
};
module.exports = stockMaterialsSchemaTable;
