const fetchUrl = "http://localhost:3000/api/";
const buttonAddVendorCode = document.querySelector("#buttonAddVendorCode");
const tableVendorsCodes = document.querySelector("#tableVendorsCodes");
const inputVendorCode = document.querySelector("#vendorСode");
const inputItemName = document.querySelector("#itemName");
const inputUnit = document.querySelector("#unit");
const inputLength = document.querySelector("#length");
const inputNotes = document.querySelector("#notes");

//ввод в поле артикул - автообновление таблицы
inputVendorCode.addEventListener("input", () => {
  //убрать запрещённые символы из поля и урезать строку
  inputVendorCode.value = inputVendorCode.value
    .substring(0, 19)
    .replace(/[^-*\d\w.\s]/gi, "");

  //если не введены данные в поле "наименование" - применяем фильтр для таблицы
  if (!inputItemName.value) {
    //в запросе отправляем только латиницу и цифры, все остальные знаки - заменить на маску %
    loadingItemFromDb(
      "vendorcode",
      inputVendorCode.value.replace(/[^\d\w]/gi, "%25") || "%25"
    );
  }
});

inputItemName.addEventListener("input", () => {
  //убрать запрещённые символы из поля и урезать строку
  inputItemName.value = inputItemName.value
    .substring(0, 255)
    .replace(/[^-*\d\wа-яё.\s]/gi, "");

  if (!inputVendorCode.value) {
    //подгрузка данных
    loadingItemFromDb(
      "itemName",
      inputItemName.value.replace(/[^\d\wа-яё]/gi, "%25") || "%25"
    );
  }
});

//открыть окно добавления артикула
buttonAddVendorCode.addEventListener("click", () => {
  loadingItemFromDb("vendorcode", "%25");
});

//подгрузка данных с сервера по артикулу
function loadingItemFromDb(column, code) {
  //
  console.log(`${fetchUrl + column}/${code}`);
  //
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
  table.innerHTML = data.reduce((output, row, index) => {
    return (output += `<tr>
          <th scope="row">${index + 1}</th>
          <td>${row.vendorCode}</td>
          <td>${row.itemName}</td>
          <td>${row.unit}</td>
          <td>${row.length || "-"}</td>
        </tr>`);
  }, "");
}
