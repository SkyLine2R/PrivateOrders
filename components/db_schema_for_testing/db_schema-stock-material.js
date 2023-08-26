const stockMaterialsDbSchema = {
  vendorCodeId: {
    required: false,
    maxlength: 10,
    containsNumber: true,
    description: "id артикула",
    regularExp: "[0-9]+",
  },
  stockId: {
    required: false,
    maxlength: 10,
    containsNumber: true,
    description: "id материала",
    regularExp: "[0-9]+",
  },
  stockColor: {
    required: true,
    maxlength: 10,
    containsNumber: true,
    description: "id цвета",
    regularExp: "[0-9]+",
  },
  stockAmount: {
    required: true,
    maxlength: 10,
    containsNumber: true,
    min: 0.001,
    max: 999999,
    description: "количество в базовых единицах",
    regularExp: "\\d+[.,]?\\d{0,3}",
  },
  document: {
    required: true,
    maxlength: 10,
    containsNumber: true,
    description: "id документа",
    regularExp: "[0-9]+",
  },
  notes: {
    required: false,
    maxlength: 180,
    containsNumber: false,
    description: "примечания к материалу в документ",
    regularExp: '[а-яё\\-+#№/()%:;*.,?"\\d\\w\\s]*',
  },
};

module.exports = stockMaterialsDbSchema;
