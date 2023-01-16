const fetchUrl = "http://localhost:3000/api/";
const addArtileButton = document.querySelector("#addArtileButton");
const tableVendorsCodes = document.querySelector("#tableVendorsCodes");
let allArtiles = {};

addArtileButton.addEventListener("click", () => {
  loadAllVendorCode();
});

//загрузить данные обо всех артикулах с сервера
function loadAllVendorCode() {
  fetch(`${fetchUrl}vendorcode/all`).then(function (response) {
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
          product.name +
          '" image failed with response ' +
          response.status +
          ": " +
          response.statusText
      );
    }
  });
}

function reloadTable(data, table) {
  console.log(data);
  //let number = 1;

  table.innerHTML = data.reduce((output, row, index) => {
    console.log(row.vendorСode);
    return (output += `<tr>
          <th scope="row">${index + 1}</th>
          <td>${row.vendorСode}</td>
          <td>${row.name}</td>
          <td>${row.unit}</td>
          <td>${row.length || "-"}</td>
        </tr>`);
  }, "");
  /* let output = `<tr>
          <th scope="row">${number++}</th>
          <td>${data.vendorCode}</td>
          <td>${data.name}</td>
          <td>${data.unit}</td>
          <td>${data.length}</td>
        </tr>`; */
  //table.innerHTML = output;
}
