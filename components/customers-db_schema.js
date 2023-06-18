const testFormForCustomers = {
  name: {
    required: true,
    maxlength: 155,
    containsNumber: false,
    description: "заказчик",
    regularExp: '[а-яё\\-/()."\\d\\w\\s]+',
    table: {
      headerName: "Заказчик",
      width: 330,
      editable: false,
    },
  },
  /*   createdBy: {
    required: false,
    maxlength: 200,
    containsNumber: false,
    description: "добавлено пользователем",
    regularExp: '[а-яё\\-+#№/()%:;*.,?"\\d\\w\\s]*',
    table: {
      headerName: "Добавлено",
      width: 150,
      editable: false,
    },
  },
  createdAt: {
    required: false,
    maxlength: 200,
    containsNumber: false,
    description: "дата добавления",
    regularExp: '[а-яё\\-+#№/()%:;*.,?"\\d\\w\\s]*',
    table: {
      headerName: "Добавлен",
      width: 150,
      editable: false,
    },
  }, */
  notes: {
    required: false,
    maxlength: 380,
    containsNumber: false,
    description: "примечания",
    regularExp: '[а-яё\\-+#№/()%:;*.,?"\\d\\w\\s]*',
    table: {
      headerName: "Примечания",
      width: 350,
      editable: false,
    },
  },
};

module.exports = testFormForCustomers;
