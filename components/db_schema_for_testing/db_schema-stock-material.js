const stockMaterialsDbSchema = {
  vendorCodeId: {
    required: true,
    maxlength: 10,
    containsNumber: true,
    description: "id артикула",
    regularExp: "[0-9]+",
  },
  colorId: {
    required: true,
    maxlength: 10,
    containsNumber: true,
    description: "id цвета",
    regularExp: "[0-9]+",
  },
  amount: {
    required: true,
    maxlength: 10,
    containsNumber: true,
    min: 0.001,
    max: 999999,
    description: "количество в базовых единицах",
    regularExp: "\\d+[.,]?\\d{0,3}",
  },
  /*   amountInUnits: {
    required: true,
    maxlength: 10,
    containsNumber: true,
    min: 0.001,
    max: 999999,
    description: "количество в условных единицах",
    regularExp: "\\d+[.,]?\\d{0,3}",
  }, */
  /*   quantity: {
    required: true,
    maxlength: 6,
    containsNumber: true,
    min: 0.1,
    max: 5000,
    description: "количество единиц в хлысте или упаковке",
    regularExp: "\\d+[.,]?\\d{0,3}",
  }, */
  /*   unit: {
    required: true,
    maxlength: 3,
    containsNumber: true,
    description: "единицы измерения",
    regularExp: "[0-9]+",
  }, */
  notes: {
    required: false,
    maxlength: 180,
    containsNumber: false,
    description: "примечания",
    regularExp: '[а-яё\\-+#№/()%:;*.,?"\\d\\w\\s]*',
  },
};

module.exports = stockMaterialsDbSchema;
