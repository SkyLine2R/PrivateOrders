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
    headerName: "Кол-во в ед.",
    width: 130,
    editable: false,
    type: "number",
  },
  amountInUnits: {
    headerName: "Кол-во в у.е.",
    width: 130,
    editable: false,
    type: "number",
  },
  notes: {
    headerName: "Примечания",
    width: 150,
    editable: false,
  },
};
module.exports = stockMaterialsSchemaTable;
