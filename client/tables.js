export { reloadTable };

function reloadTable(table, data) {
  if (data.error) {
    table.innerHTML = `<tr>
          <th scope="row">${data.error}</th>
        </tr>`;
  }
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
