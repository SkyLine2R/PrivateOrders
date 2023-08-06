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
    flex: 0.5,
    editable: false,
    type: "date",
  },
  name: {
    headerName: "Документ",
    flex: 2,
    editable: false,
  },
  number: {
    headerName: "№ док-та",
    flex: 0.2,
    editable: false,
  },
  notes: {
    headerName: "Примечания",
    flex: 1,
    editable: false,
  },
  createdBy: {
    headerName: "Создал",
    flex: 0.5,
    editable: false,
    parseTime: true,
  },
};

module.exports = documentsSchemaTable;
