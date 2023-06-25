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
  // Если всё норм - возвращает объект c данными. Нет - объект с массивом ошибок
  const errArr = [];
  if (isObjectEmpty(refObj) && isObjectEmpty(testObj)) {
    return errArr.push(`Не удалось проверить данные - получен пустой объект`);
  }
  for (const key in refObj) {
    // eslint-disable-next-line no-continue
    if (refObj[key] === null) continue;
    if (
      refObj[key].required &&
      (!Object.prototype.hasOwnProperty.call(testObj, key) ||
        `${testObj[key]}`.trim() === "")
    ) {
      errArr.push(
        `Поле "${refObj[key].description}" должно содержать значение.`
      );
    }

    if (Object.prototype.hasOwnProperty.call(testObj, key)) {
      if (
        (refObj[key].containsNumber && +testObj[key] < refObj[key].min) ||
        +testObj[key] > refObj[key].max
      )
        errArr.push(
          `Значение "${refObj[key].description}" должно быть положительным числом в диапазоне от ${refObj[key].min} до ${refObj[key].max}.`
        );

      if (`${testObj[key]}`.length > refObj[key].maxlength) {
        errArr.push(
          `Значение "${refObj[key].description}" должно быть короче ${refObj[key].maxlength} символов.`
        );
      }
    }
  }

  return errArr.length ? { error: errArr } : testObj;
}
module.exports = testDataFromForm;
