// Запросы отправляемые на API:
// type: save, load, filter
// table: таблица для сохранения или выборки
//
// fields: {поля с данными во вложенном объекте для сохранения}


export { reqToDb };

const fetchUrl = "http://localhost:3000/api";

async function reqToDb(data) {
  const response = await fetch(fetchUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    // также добавить функцию вывода окна с сообщением об ошибке
    console.log(
      'Сетевой запрос "' +
        fetchUrl +
        method +
        data +
        '" завершился с ошибкой: ' +
        response.status +
        ": " +
        response.statusText
    );
    return { error: "Ошибка получения данных!" + data.error.message };
  } else {
    return response.json();
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
