const inOutStockDbSchema = {
  stockAmount: {
    required: true,
    maxlength: 9,
    containsNumber: true,
    min: 0.01,
    max: 1000000,
    description: "количество материала в базовых единицах",
    regularExp: "\\d+[.,]?\\d{0,3}",
  },
  /*   stockAmountInUnit: {
    required: true,
    maxlength: 9,
    containsNumber: true,
    min: 0.01,
    max: 1000000,
    description: "количество материала в сборных единицах",
    regularExp: "\\d+[.,]?\\d{0,3}",
  }, */
  notes: {
    required: false,
    maxlength: 180,
    containsNumber: false,
    description: "примечания",
    regularExp: '[а-яё\\-+#№/()%:;*.,?"\\d\\w\\s]*',
  },
};

module.exports = inOutStockDbSchema;
