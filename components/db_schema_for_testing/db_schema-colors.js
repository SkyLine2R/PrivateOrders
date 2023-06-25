const colorsDbSchema = {
  name: {
    required: true,
    maxlength: 155,
    containsNumber: false,
    description: "название цвета",
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

module.exports = colorsDbSchema;
