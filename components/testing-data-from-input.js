/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
// export { testDataFromForm };

function isObjectEmpty(value) {
  return (
    Object.prototype.toString.call(value) === "[object Object]" &&
    JSON.stringify(value) === "{}"
  );
}

function testDataFromForm(refObj, testObj) {
  // Функция проверки переданных значений.
  // Принимает объект refObj с параметрами проверки и объект с данными
  // Если всё норм - возвращает объект c данными, нет - объект с массивом ошибок

  const errArr = [];
  // Проверить объекты на пустоту, если норм - проверить правильность заполнения полей
  if (!isObjectEmpty(refObj) && !isObjectEmpty(testObj)) {
    for (const key in refObj) {
      if (refObj[key].required && testObj[key].trim() === "") {
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
  } else errArr.push("Не удалось проверить данные формы");
  return errArr.length ? { errors: errArr } : testObj;
}
module.exports = testDataFromForm;
