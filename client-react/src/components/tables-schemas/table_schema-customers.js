// Объект для заполнения хедеров таблицы
//      headerName: "Ед. изм.",           / наименование столбца
//      width: 80,                        / минимальная ширина столбца
//      editable: false,                  / возможность редактирования в ячейке (пока не используется)
//      align: "center",                  / выравнивание
//    },
//    unitArr: ["м / хл.", "шт. / уп.", "м / уп."], / подстановочные данные вместо индекса БД (для Select’ов)
//  },

const customersSchemaTable = {
  name: {
    headerName: "Заказчик",
    width: 330,
    editable: false,
  },
  notes: {
    headerName: "Примечания",
    width: 350,
    editable: false,
  },
};

module.exports = customersSchemaTable;
