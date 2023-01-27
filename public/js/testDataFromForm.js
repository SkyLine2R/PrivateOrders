function testDataFromForm(refObj, jsonData) {
  //Функция проверки переданных значений.
  //Принимает объект с параметрами проверки и JSON с данными
  //Если всё норм - возвращает объект c данными, нет - объект с массивом ошибок
  const testObj = JSON.parse(jsonData);
  const errArr = [];

  for (let key in refObj) {
    if (refObj[key].required && !testObj[key]) {
      errArr.push(
        `Поле "${refObj[key].description}" должно содержать значение.`
      );
    }
    if (refObj[key].containsNumber) {
      if (+testObj[key] < refObj[key].min || +testObj[key] > refObj[key].max)
        errArr.push(
          `Значение "${refObj[key].description}" должно быть положительным числом в диапазоне от ${refObj[key].min} до ${refObj[key].max}.`
        );
    } else if (testObj[key].length > refObj[key].maxlength) {
      errArr.push(
        `Значение "${refObj[key].description}" должно быть короче ${refObj[key].maxlength} символов.`
      );
    }
  }
  return errArr.length ? { errors: errArr } : testObj;
}

//Объект для проверки значений при заполнении артикула

const testFormForInputItem = {
  vendorCode: {
    required: true,
    maxlength: 20,
    containsNumber: false,
    description: "артикул изделия",
    regularExp: 'а-яё\\-+/()#*.,"\\d\\w\\s',
  },
  itemName: {
    required: true,
    maxlength: 255,
    containsNumber: false,
    description: "наименование изделия",
    regularExp: 'а-яё\\-+#№/()%:;*.,"\\d\\w\\s',
  },
  unit: {
    required: true,
    maxlength: 15,
    containsNumber: false,
    description: "единицы измерения",
    regularExp: "а-яё.,/-\\d\\w\\s",
  },
  quantity: {
    required: true,
    maxlength: 5,
    containsNumber: true,
    min: 0.1,
    max: 5000,
    description: "количество единиц в хлысте или упаковке",
    regularExp: ".,/d",
  },
  notes: {
    required: false,
    maxlength: 200,
    containsNumber: false,
    description: "примечания",
    regularExp: 'а-яё\\-+#№/()%:;*.,"\\d\\w\\s',
  },
};
