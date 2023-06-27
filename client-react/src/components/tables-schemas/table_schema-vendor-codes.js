// Объект для заполнения хедеров таблицы
//      headerName: "Ед. изм.",           / наименование столбца
//      width: 80,                        / минимальная ширина столбца
//      editable: false,                  / возможность редактирования в ячейке (пока не используется)
//      align: "center",                  / выравнивание
//    },
//    unitArr: ["м / хл.", "шт. / уп.", "м / уп."], / подстановочные данные вместо индекса БД (для Select’ов)
//  },

const vendorCodeSchemaTable = {
  vendorCode: {
    headerName: "Артикул",
    width: 90,
    editable: false,
  },
  name: {
    headerName: "Наименование",
    width: 330,
    editable: false,
  },
  unit: {
    headerName: "Ед. изм.",
    width: 80,
    editable: false,
    align: "center",
    unitArr: ["м / хл.", "шт. / уп.", "м / уп."],
  },
  quantity: {
    headerName: "Кол-во в хл. | уп.",
    width: 130,
    editable: false,
    type: "number",
    align: "center",
  },
  notes: {
    headerName: "Примечания",
    width: 150,
    editable: false,
  },
};

module.exports = vendorCodeSchemaTable;
