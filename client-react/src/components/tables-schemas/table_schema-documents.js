// Объект для заполнения хедеров таблицы
//      headerName: "Ед. изм.",           / наименование столбца
//      width: 80,                        / минимальная ширина столбца
//      editable: false,                  / возможность редактирования в ячейке (пока не используется)
//      align: "center",                  / выравнивание
//    },
//    unitArr: ["м / хл.", "шт. / уп.", "м / уп."], / подстановочные данные вместо индекса БД (для Select’ов)
//  },

const documentsSchemaTable = {
  date: {
    headerName: "Дата",
    width: 120,
    editable: false,
    type: "date",
  },
  name: {
    headerName: "Документ",
    width: 400,
    editable: false,
  },
  number: {
    headerName: "№ док-та",
    width: 80,
    editable: false,
  },
  notes: {
    headerName: "Примечания",
    width: 350,
    editable: false,
  },
  createdBy: {
    headerName: "Создал",
    width: 200,
    editable: false,
    parseTime: true,
  },
};

module.exports = documentsSchemaTable;
