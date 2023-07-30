const quickSearchDbSchema = {
  quickSearchString: {
    maxlength: 50,
    containsNumber: false,
    description: "быстрый поиск",
    regularExp: '[а-яё\\-+#№/()%:;*.,"\\d\\w\\s]+',
  },
};

module.exports = quickSearchDbSchema;
