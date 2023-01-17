const fetchUrl = "http://localhost:3000/api/";
const addArtileButton = document.querySelector("#addArtileButton");
const tableVendorsCodes = document.querySelector("#tableVendorsCodes");
const inputVendorCode = document.querySelector("#vendorСode");
const inputItem = document.querySelector("#item");
const inputUnit = document.querySelector("#unit");
const inputLength = document.querySelector("#length");
const inputNotes = document.querySelector("#notes");

//ввод в поле артикул
inputVendorCode.addEventListener("input", () => {
  //ввод только допустимых символов в поле артикула
  inputVendorCode.value = inputVendorCode.value.replace(/[^-*\d\w.\s]/gi, "");

  loadingVendorCodes(inputVendorCode.value.replace(/[^\d\w]/gi, "") || "all");
});

//загрузка данных в таблицу артикулов
addArtileButton.addEventListener("click", () => {
  loadingVendorCodes("all");
});

//подгрузка данных с сервера по артикулу
function loadingVendorCodes(code) {
  fetch(`${fetchUrl}vendorcode/${code}`).then(function (response) {
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
          product.item +
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
    console.log(row.vendorСode);
    return (output += `<tr>
          <th scope="row">${index + 1}</th>
          <td>${row.vendorСode}</td>
          <td>${row.item}</td>
          <td>${row.unit}</td>
          <td>${row.length || "-"}</td>
        </tr>`);
  }, "");
}
