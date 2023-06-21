const colorsSchema = {
  name: {
    required: true,
    maxlength: 155,
    containsNumber: false,
    description: "название цвета",
    regularExp: '[а-яё\\-/()."\\d\\w\\s]+',
    table: {
      headerName: "Название цвета",
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

module.exports = colorsSchema;
