// Запросы отправляемые на API:
// type: save, load, filter
// table: таблица для сохранения или выборки
//
// fields: {поля с данными во вложенном объекте для сохранения}

export { loadingItemFromDb, savingItemToDb, reloadTable };

const fetchUrl = "http://localhost:3000/api/";

async function loadingItemFromDb(reqType, code, func) {
  //запрос переделанный на POST
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });

  console.log(await response.json()); // parses JSON response into native JavaScript objects

  //подгрузка данных с сервера (столбец где искать данные и строка запроса)
  console.log(`${fetchUrl + reqType}/${code}`);
  fetch(`${fetchUrl + reqType}/${code}`).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        if (data.error) {
          //
          // добавить функцию вывода окна с сообщением об ошибке
          // вместо вывода в таблицу
          reloadTable(
            { error: "Ошибка получения данных!" + data.error.message },
            tableVendorsCodes
          );
        }
        reloadTable(data, tableVendorsCodes);
      });
    } else {
      //
      // также добавить функцию вывода окна с сообщением об ошибке
      console.log(
        'Сетевой запрос "' +
          fetchUrl +
          reqType +
          code +
          '" завершился с ошибкой. Сообщение ' +
          response.status +
          ": " +
          response.statusText
      );
    }
  });
}

function savingItemToDb(table, data) {
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
}

function reloadTable(data, table) {
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

/* 
// Пример отправки POST запроса:
async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}

postData('https://example.com/answer', { answer: 42 })
  .then((data) => {
    console.log(data); // JSON data parsed by `response.json()` call
  }); */

/*   Отправка запроса с учётными данными
Чтобы браузеры могли отправлять запрос с учётными данными (даже для cross-origin запросов), добавьте credentials: 'include' в объект init, передаваемый вами в метод fetch():

fetch('https://example.com', {
  credentials: 'include'
})
Copy to Clipboard
Если вы хотите отправлять запрос с учётными данными только если URL принадлежит одному источнику (origin) что и вызывающий его скрипт, добавьте credentials: 'same-origin'.

// Вызывающий скрипт принадлежит источнику 'https://example.com'

fetch('https://example.com', {
credentials: 'same-origin'
})
Copy to Clipboard
Напротив, чтобы быть уверенным, что учётные данные не передаются с запросом, используйте credentials: 'omit':

fetch('https://example.com', {
credentials: 'omit'
}) */
