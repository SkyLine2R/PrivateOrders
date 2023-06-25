const customersDbSchema = {
  name: {
    required: true,
    maxlength: 155,
    containsNumber: false,
    description: "заказчик",
    regularExp: '[а-яё\\-/()."\\d\\w\\s]+',
  },
  notes: {
    required: false,
    maxlength: 380,
    containsNumber: false,
    description: "примечания",
    regularExp: '[а-яё\\-+#№/()%:;*.,?"\\d\\w\\s]*',
  },
};

module.exports = customersDbSchema;
