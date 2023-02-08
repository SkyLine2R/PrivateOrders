// Для проверки ввода в формы
const testDataFromForm = require("../components/testing-data-from-input.js");
const testFormForInputItem = require("../components/items-db_schema.js");

import { reloadTable } from "../client/tables"; //функция для обновления таблицы
import { reqToDb } from "./loadingItemFromDb.js"; //запросы к БД

const buttonAddVendorCode = document.querySelector("#buttonAddVendorCode");
const tableVendorsCodes = document.querySelector("#tableVendorsCodes");
const inputVendorCode = document.querySelector("#inputVendorCode");
const inputItemName = document.querySelector("#inputItemName");
const inputUnit = document.querySelector("#inputUnit");
const inputQuantity = document.querySelector("#inputQuantity");
const inputNotes = document.querySelector("#inputNotes");
const submitToDB = document.querySelector("#submitToDB");
//регулярка для быстрого фильтра по артикулам
const regExpForFilter = new RegExp("[^а-яё\\d\\w]", "gi");
//открыть окно добавления артикула

buttonAddVendorCode.addEventListener("click", () => {
  reqToDb({
    type: "getFilteredVendorCodes",
    table: "items",
    column: "vendorCode",
    data: "",
  }).then((items) => reloadTable(tableVendorsCodes, items));
});

//добавить артикул в БД
submitToDB.addEventListener("click", (e) => {
  e.preventDefault();
  const formValue = JSON.stringify(
    Object.fromEntries(new FormData(window.formForInputItem))
  );
  const verifiedData = testDataFromForm(testFormForInputItem, formValue);

  if (verifiedData.hasOwnProperty("errors")) {
    //добавить функцию вывода предупреждения warningFunc()
    alert("Ошибка при добавлении данных. " + verifiedData.errors);
  } else {
    reqToDb({
      type: "findEntry",
      table: "items",
      column: "vendorCode",
      data: verifiedData.vendorCode,
    }).then((item) => {
      console.log("Получено: " + item[0].vendorCode);
      // если в базе есть подобный артикул - уточнить нужно ли добавлять
      // или сразу добавить, если артикула нет в базе
      // добавить нормальное модальное окно с вопросом
      // и вывод уведомления об успехе или отмене добавления
      let confirmation =
        (item[0].vendorCode &&
        confirm(
          "В базе уже есть подобный артикул:" +
            item[0].vendorCode +
            item[0].itemName +
            "Вы уверены, что хотите добавить ещё один?"
        )
          ? true
          : false) && true;

      if (confirmation) {
        reqToDb({
          type: "addEntry",
          table: "items",
          data: verifiedData,
        }).then((item) => {
          console.log(item);
        });
      }
    });

    /* reqToDb("items", verifiedData); */
  }
});

//ввод в поле "артикул"
inputVendorCode.addEventListener("input", () => {
  //автокоррекция вводимых данных
  inputVendorCode.value = textСorrectionInField(
    testFormForInputItem.vendorCode,
    inputVendorCode.value
  );
  autoFilterForInputs(inputVendorCode.value, inputItemName.value);
});

//ввод в поле "наименование"
inputItemName.addEventListener("input", () => {
  inputItemName.value = textСorrectionInField(
    testFormForInputItem.itemName,
    inputItemName.value
  );

  autoFilterForInputs(inputVendorCode.value, inputItemName.value);
});

function autoFilterForInputs(field1, field2) {
  //оставляем в запросе только буквы и цифры,
  // знаки и пробелы заменяем на маску "любые символы - %"
  const reqFilter =
    (field1 || field2).replace(regExpForFilter, "%").toLowerCase() || "";

  //если введены данные в два поля - фильтр не используем
  if (!(field1 && field2)) {
    reqToDb({
      type: "getFilteredVendorCodes",
      table: "items",
      column: `${field1 ? "vendorCode" : "tags"}`,
      data: reqFilter,
    }).then((items) => reloadTable(tableVendorsCodes, items));
  }
}
//ввод количества
inputQuantity.addEventListener("input", () => {
  inputItemName.value = textСorrectionInField(
    testFormForInputItem.quantity,
    inputItemName.value
  );

  if (inputQuantity.value.length > 6) {
    inputQuantity.value = inputQuantity.value.substring(0, 6);
  }
});
//ввод примечаний
inputNotes.addEventListener("input", () => {
  inputNotes.value = textСorrectionInField(
    testFormForInputItem.notes,
    inputNotes.value
  );
});

//Перенос данных в поля input кликами по соответствующим полям в таблице
tableVendorsCodes.addEventListener("click", (e) => {
  if (e.target.className)
    window[
      "input" +
        e.target.className[0].toUpperCase() +
        e.target.className.slice(1)
    ].value = e.target.textContent;
});

function textСorrectionInField(refObj, fieldValue) {
  //Убираем запрещённые символы и обрезаем строку
  return fieldValue
    .replace("ё", "е")
    .replace("Ё", "Е")
    .replace(new RegExp(`[^${refObj.regularExp}]`, "gi"), "")
    .substring(0, refObj.maxlength - 1);
}
