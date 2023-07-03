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
    width: 90,
    editable: false,
    type: "string",
  },
  itemName: {
    headerName: "Наименование",
    width: 330,
    editable: false,
  },
  colorName: {
    headerName: "Цвет",
    width: 220,
    editable: false,
  },
  amount: {
    headerName: "Кол-во",
    width: 110,
    editable: false,
    type: "number",
  },
  amountName: {
    headerName: "ед.",
    width: 50,
    editable: false,
    type: "string",
  },
  amountInUnits: {
    headerName: "Кол-во",
    width: 110,
    editable: false,
    type: "number",
  },
  amountInUnitsName: {
    headerName: "ед.",
    width: 50,
    editable: false,
    type: "string",
  },
  notes: {
    headerName: "Примечания",
    width: 150,
    editable: false,
  },
};
module.exports = stockMaterialsSchemaTable;
