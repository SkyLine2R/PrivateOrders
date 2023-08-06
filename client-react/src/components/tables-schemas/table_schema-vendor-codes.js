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
    description: "Артикул от производителя",
    flex: 0.5,
    editable: false,
  },
  name: {
    headerName: "Наименование",
    description: "Полное наименование материала",
    flex: 2,
    editable: false,
  },
  unit: {
    headerName: "Ед. изм.",
    description:
      "Базовая единица (метр, штука) / сборная единица (упаковка, хлыст)",
    flex: 0.5,
    editable: false,
    align: "center",
    unitArr: ["м / хл.", "шт. / уп.", "м / уп."],
  },
  quantity: {
    headerName: "Кол-во в хл. | уп.",
    description:
      "Сколько в сборной единице базовых. Базовая (метр, штука) / сборная (упаковка, хлыст)",
    flex: 0.5,
    editable: false,
    type: "number",
    align: "center",
  },
  notes: {
    headerName: "Примечания",
    description: "Примечания",
    flex: 1,
    editable: false,
  },
};

module.exports = vendorCodeSchemaTable;
