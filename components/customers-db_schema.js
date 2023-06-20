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
