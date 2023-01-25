//
console.log(window.location.pathname);
import testDataFromForm from "./js/testDataFromForm.js";

const fetchUrl = "http://localhost:3000/api/";
const buttonAddVendorCode = document.querySelector("#buttonAddVendorCode");
const tableVendorsCodes = document.querySelector("#tableVendorsCodes");
const inputVendorCode = document.querySelector("#inputVendorCode");
const inputItemName = document.querySelector("#inputItemName");
const inputUnit = document.querySelector("#inputUnit");
const inputLength = document.querySelector("#inputLength");
const inputNotes = document.querySelector("#inputNotes");
const submitToBase = document.querySelector("#submitToBase");

submitToBase.addEventListener("click", (e) => {
  e.preventDefault();
  const formValue = JSON.stringify(
    Object.fromEntries(new FormData(window.formForInputItem))
  );

  console.log(formValue);
  formValue.map((element) => {
    console.log(element);
  });
  testDataFromForm(testFormForInputItem, formValue);
  //console.log(formValue.get("inputItemName"));
  //попробовать перебирать элементы формы для конвертации json, возможно переименовать элементы ввода в валидные имена как в БД чтобы было меньше преобразований
  if (
    inputVendorCode.value &&
    inputItemName.value &&
    inputUnit.value &&
    inputLength.value
  ) {
  }

  const sendData = JSON.stringify({
    vendorCode: inputVendorCode.value,
    ItemName: inputItemName.value,
  });

  fetch(fetchUrl + "addItem", {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: sendData,
  }).then(function (response) {
    if (response.ok) {
      alert("Отправлено");
      response.json().then(function (data) {
        if (data.error) {
          alert(data.message);
        }
        reloadTable(data, tableVendorsCodes);
      });
    } else {
      console.log(
        "Network request for /addItem" +
          '" image failed with response ' +
          response.status +
          ": " +
          response.statusText
      );
    }
  });
});

//ввод в поле артикул - автообновление таблицы //debugger;
inputVendorCode.addEventListener("input", () => {
  //убрать запрещённые символы из поля и урезать строку
  inputVendorCode.value = inputVendorCode.value
    .replace(/[^-+*а-яё.,"/\d\w\s]/gi, "")
    .substring(0, 19);
  //если не введены данные в поле "наименование" - применяем фильтр для таблицы
  if (!inputItemName.value) {
    //в запросе отправляем только буквы и цифры, все остальные знаки - заменить на маску %
    loadingItemFromDb(
      "filter",
      inputVendorCode.value.replace(/[^а-яё\d\w]/gi, "%25").toLowerCase() ||
        "%25"
    );
  }
});
inputItemName.addEventListener("input", () => {
  //убрать запрещённые символы из поля и урезать строку
  inputItemName.value = textAdapting(
    inputItemName.value,
    "[^-+*dwа-яё.,/s]",
    "",
    255
  );

  /*   inputItemName.value = inputItemName.value
    .replace(/[^-+*\d\wа-яё.,/\s]/gi, "")
    .substring(0, 255); */

  if (!inputVendorCode.value) {
    //подгрузка данных
    loadingItemFromDb(
      "filter",
      inputItemName.value.replace(/[^\d\wа-яё]/gi, "%25").toLowerCase() || "%25"
    );
  }
});

function textAdapting(
  string,
  stringToReplaceRegExp,
  replaceString,
  maxLenghtForString
) {
  return string
    .replace("ё", "е")
    .replace("Ё", "Е")
    .replace(`/${stringToReplaceRegExp}/gi`, replaceString)
    .substring(0, maxLenghtForString);
}

inputLength.addEventListener("input", () => {
  //ограничить длину ввода
  if (+inputLength.value.length > 6) {
    console.log(inputLength.value);
    inputLength.value = inputLength.value.substring(0, 6);
  }
});

//Добавление данных в поля input кликами по таблице
tableVendorsCodes.addEventListener("click", (e) => {
  if (e.target.className)
    window["input" + e.target.className].value = e.target.textContent;
});

//открыть окно добавления артикула
buttonAddVendorCode.addEventListener("click", () => {
  loadingItemFromDb("filter", "%25");
});

function loadingItemFromDb(column, code) {
  //подгрузка данных с сервера (столбец где искать данные и строка запроса)
  fetch(`${fetchUrl + column}/${code}`).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        if (data.error) {
          alert(data.message);
        }
        reloadTable(data, tableVendorsCodes);
      });
    } else {
      console.log(
        'Network request for "' +
          fetchUrl +
          column +
          code +
          '" image failed with response ' +
          response.status +
          ": " +
          response.statusText
      );
    }
  });
}

function reloadTable(data, table) {
  //Обновление таблицы с артикулами
  if (data.length) {
    table.innerHTML = data.reduce((output, row, index) => {
      return (output += `<tr>
          <th scope="row">${index + 1}</th>
          <td class='VendorCode'>${row.vendorCode}</td>
          <td class='ItemName'>${row.itemName}</td>
          <td class='Unit'>${row.unit}</td>
          <td class='Length'>${row.length || "-"}</td>
        </tr>`);
    }, "");
  } else {
    table.innerHTML = `<tr>
          <th scope="row">Нет подобных артикулов</th>
        </tr>`;
  }
}
