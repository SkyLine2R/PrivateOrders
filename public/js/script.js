const fetchUrl = "http://localhost:3000/api/";
const buttonAddVendorCode = document.querySelector("#buttonAddVendorCode");
const tableVendorsCodes = document.querySelector("#tableVendorsCodes");
const inputVendorCode = document.querySelector("#inputVendorCode");
const inputItemName = document.querySelector("#inputItemName");
const inputUnit = document.querySelector("#inputUnit");
const inputLength = document.querySelector("#inputLength");
const inputNotes = document.querySelector("#inputNotes");
//debugger;
//ввод в поле артикул - автообновление таблицы
inputVendorCode.addEventListener("input", () => {
  //убрать запрещённые символы из поля и урезать строку
  inputVendorCode.value = inputVendorCode.value
    .replace(/[^-*а-яё.,/\d\w\s]/gi, "")
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
  inputItemName.value = inputItemName.value
    .replace(/[^-+*\d\wа-я.,/\s]/gi, "")
    .substring(0, 255);

  if (!inputVendorCode.value) {
    //подгрузка данных
    loadingItemFromDb(
      "filter",
      inputItemName.value.replace(/[^\d\wа-яё]/gi, "%25").toLowerCase() || "%25"
    );
  }
});

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
