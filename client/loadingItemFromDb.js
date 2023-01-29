export { loadingItemFromDb };
export { reloadTable };

const fetchUrl = "http://localhost:3000/api/";

function loadingItemFromDb(column, code, func) {
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
          <td class='vendorCode'>${row.vendorCode}</td>
          <td class='itemName'>${row.itemName}</td>
          <td class='unit'>${row.unit}</td>
          <td class='quantity'>${row.quantity}</td>
        </tr>`);
    }, "");
  } else {
    table.innerHTML = `<tr>
          <th scope="row">Нет подобных артикулов</th>
        </tr>`;
  }
}
