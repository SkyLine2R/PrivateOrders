import { testFormForInputItem } from "../components/items-db_schema.js"; //объект для проверки ввода
import { testDataFromForm } from "../components/testing-data-from-input.js"; //функция для проверки ввода
import { loadingItemFromDb } from "./loadingItemFromDb.js"; //загрузка данных с БД
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
  loadingItemFromDb("filter", "%25");
});

submitToDB.addEventListener("click", (e) => {
  e.preventDefault();
  const formValue = JSON.stringify(
    Object.fromEntries(new FormData(window.formForInputItem))
  );
  const verifiedData = testDataFromForm(testFormForInputItem, formValue);

  if (verifiedData.hasOwnProperty("errors")) {
    //добавить функцию вывода предупреждения warningFunc()

    alert("Проверьте правильность заполнения формы." + verifiedData.errors);
  } else {
    // проверить нет ли такого артикула в базе.

    console.log(fetchUrl + "addItem");
    savingItemToDb("items", verifiedData);
  }
});

//ввод в поле "артикул"
inputVendorCode.addEventListener("input", () => {
  //автокоррекция вводимых данных
  console.log(testFormForInputItem);
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
    (field1 || field2).replace(regExpForFilter, "%25").toLowerCase() || "%25";

  //если введены данные в два поля - фильтр не используем
  if (!(field1 && field2)) {
    loadingItemFromDb("filter", reqFilter);
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
