/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./client/loadingItemFromDb.js":
/*!*************************************!*\
  !*** ./client/loadingItemFromDb.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"reqToDb\": () => (/* binding */ reqToDb)\n/* harmony export */ });\n// Запросы отправляемые на API:\n// type: save, load, filter\n// table: таблица для сохранения или выборки\n//\n// fields: {поля с данными во вложенном объекте для сохранения}\n\n\nconst fetchUrl = \"http://localhost:3000/api\";\nasync function reqToDb(data) {\n  const response = await fetch(fetchUrl, {\n    method: \"POST\",\n    headers: {\n      \"Content-Type\": \"application/json;charset=utf-8\"\n    },\n    referrerPolicy: \"no-referrer\",\n    body: JSON.stringify(data)\n  });\n  if (!response.ok) {\n    // также добавить функцию вывода окна с сообщением об ошибке\n    console.log('Сетевой запрос \"' + fetchUrl + method + data + '\" завершился с ошибкой: ' + response.status + \": \" + response.statusText);\n    return {\n      error: \"Ошибка получения данных!\" + data.error.message\n    };\n  } else {\n    return response.json();\n  }\n}\n\n/* \r\n// Пример отправки POST запроса:\r\nasync function postData(url = '', data = {}) {\r\n  // Default options are marked with *\r\n  const response = await fetch(url, {\r\n    method: 'POST', // *GET, POST, PUT, DELETE, etc.\r\n    mode: 'cors', // no-cors, *cors, same-origin\r\n    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached\r\n    credentials: 'same-origin', // include, *same-origin, omit\r\n    headers: {\r\n      'Content-Type': 'application/json'\r\n      // 'Content-Type': 'application/x-www-form-urlencoded',\r\n    },\r\n    redirect: 'follow', // manual, *follow, error\r\n    referrerPolicy: 'no-referrer', // no-referrer, *client\r\n    body: JSON.stringify(data) // body data type must match \"Content-Type\" header\r\n  });\r\n  return await response.json(); // parses JSON response into native JavaScript objects\r\n}\r\n\r\npostData('https://example.com/answer', { answer: 42 })\r\n  .then((data) => {\r\n    console.log(data); // JSON data parsed by `response.json()` call\r\n  }); */\n\n/*   Отправка запроса с учётными данными\r\nЧтобы браузеры могли отправлять запрос с учётными данными (даже для cross-origin запросов), добавьте credentials: 'include' в объект init, передаваемый вами в метод fetch():\r\n\r\nfetch('https://example.com', {\r\n  credentials: 'include'\r\n})\r\nCopy to Clipboard\r\nЕсли вы хотите отправлять запрос с учётными данными только если URL принадлежит одному источнику (origin) что и вызывающий его скрипт, добавьте credentials: 'same-origin'.\r\n\r\n// Вызывающий скрипт принадлежит источнику 'https://example.com'\r\n\r\nfetch('https://example.com', {\r\ncredentials: 'same-origin'\r\n})\r\nCopy to Clipboard\r\nНапротив, чтобы быть уверенным, что учётные данные не передаются с запросом, используйте credentials: 'omit':\r\n\r\nfetch('https://example.com', {\r\ncredentials: 'omit'\r\n}) */\n\n//# sourceURL=webpack://privateorders/./client/loadingItemFromDb.js?");

/***/ }),

/***/ "./client/script.js":
/*!**************************!*\
  !*** ./client/script.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_items_db_schema_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/items-db_schema.js */ \"./components/items-db_schema.js\");\n/* harmony import */ var _components_testing_data_from_input_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/testing-data-from-input.js */ \"./components/testing-data-from-input.js\");\n/* harmony import */ var _client_tables__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../client/tables */ \"./client/tables.js\");\n/* harmony import */ var _loadingItemFromDb_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./loadingItemFromDb.js */ \"./client/loadingItemFromDb.js\");\n //объект для проверки ввода\n //функция для проверки ввода\n\n //функция для проверки ввода\n\n //загрузка данных с БД\nconst buttonAddVendorCode = document.querySelector(\"#buttonAddVendorCode\");\nconst tableVendorsCodes = document.querySelector(\"#tableVendorsCodes\");\nconst inputVendorCode = document.querySelector(\"#inputVendorCode\");\nconst inputItemName = document.querySelector(\"#inputItemName\");\nconst inputUnit = document.querySelector(\"#inputUnit\");\nconst inputQuantity = document.querySelector(\"#inputQuantity\");\nconst inputNotes = document.querySelector(\"#inputNotes\");\nconst submitToDB = document.querySelector(\"#submitToDB\");\n//регулярка для быстрого фильтра по артикулам\nconst regExpForFilter = new RegExp(\"[^а-яё\\\\d\\\\w]\", \"gi\");\n//открыть окно добавления артикула\n\nbuttonAddVendorCode.addEventListener(\"click\", () => {\n  (0,_loadingItemFromDb_js__WEBPACK_IMPORTED_MODULE_3__.reqToDb)({\n    type: \"getFilteredVendorCodes\",\n    table: \"items\",\n    column: \"vendorCode\",\n    data: \"\"\n  }).then(items => (0,_client_tables__WEBPACK_IMPORTED_MODULE_2__.reloadTable)(tableVendorsCodes, items));\n});\n\n//добавить артикул в БД\nsubmitToDB.addEventListener(\"click\", e => {\n  e.preventDefault();\n  const formValue = JSON.stringify(Object.fromEntries(new FormData(window.formForInputItem)));\n  const verifiedData = (0,_components_testing_data_from_input_js__WEBPACK_IMPORTED_MODULE_1__.testDataFromForm)(_components_items_db_schema_js__WEBPACK_IMPORTED_MODULE_0__.testFormForInputItem, formValue);\n  if (verifiedData.hasOwnProperty(\"errors\")) {\n    //добавить функцию вывода предупреждения warningFunc()\n\n    alert(\"Проверьте правильность заполнения формы.\" + verifiedData.errors);\n  } else {\n    (0,_loadingItemFromDb_js__WEBPACK_IMPORTED_MODULE_3__.reqToDb)({\n      type: \"findEntry\",\n      table: \"items\",\n      column: \"vendorCode\",\n      data: verifiedData.vendorCode\n    }).then(items => {\n      console.log(items);\n      alert(items);\n    });\n\n    // проверить нет ли такого артикула в базе.\n\n    (0,_loadingItemFromDb_js__WEBPACK_IMPORTED_MODULE_3__.reqToDb)(\"items\", verifiedData);\n  }\n});\n\n//ввод в поле \"артикул\"\ninputVendorCode.addEventListener(\"input\", () => {\n  //автокоррекция вводимых данных\n  inputVendorCode.value = textСorrectionInField(_components_items_db_schema_js__WEBPACK_IMPORTED_MODULE_0__.testFormForInputItem.vendorCode, inputVendorCode.value);\n  autoFilterForInputs(inputVendorCode.value, inputItemName.value);\n});\n\n//ввод в поле \"наименование\"\ninputItemName.addEventListener(\"input\", () => {\n  inputItemName.value = textСorrectionInField(_components_items_db_schema_js__WEBPACK_IMPORTED_MODULE_0__.testFormForInputItem.itemName, inputItemName.value);\n  autoFilterForInputs(inputVendorCode.value, inputItemName.value);\n});\nfunction autoFilterForInputs(field1, field2) {\n  //оставляем в запросе только буквы и цифры,\n  // знаки и пробелы заменяем на маску \"любые символы - %\"\n  const reqFilter = (field1 || field2).replace(regExpForFilter, \"%\").toLowerCase() || \"\";\n\n  //если введены данные в два поля - фильтр не используем\n  if (!(field1 && field2)) {\n    (0,_loadingItemFromDb_js__WEBPACK_IMPORTED_MODULE_3__.reqToDb)({\n      type: \"getFilteredVendorCodes\",\n      table: \"items\",\n      column: `${field1 ? \"vendorCode\" : \"tags\"}`,\n      data: reqFilter\n    }).then(items => (0,_client_tables__WEBPACK_IMPORTED_MODULE_2__.reloadTable)(tableVendorsCodes, items));\n  }\n}\n//ввод количества\ninputQuantity.addEventListener(\"input\", () => {\n  inputItemName.value = textСorrectionInField(_components_items_db_schema_js__WEBPACK_IMPORTED_MODULE_0__.testFormForInputItem.quantity, inputItemName.value);\n  if (inputQuantity.value.length > 6) {\n    inputQuantity.value = inputQuantity.value.substring(0, 6);\n  }\n});\n//ввод примечаний\ninputNotes.addEventListener(\"input\", () => {\n  inputNotes.value = textСorrectionInField(_components_items_db_schema_js__WEBPACK_IMPORTED_MODULE_0__.testFormForInputItem.notes, inputNotes.value);\n});\n\n//Перенос данных в поля input кликами по соответствующим полям в таблице\ntableVendorsCodes.addEventListener(\"click\", e => {\n  if (e.target.className) window[\"input\" + e.target.className[0].toUpperCase() + e.target.className.slice(1)].value = e.target.textContent;\n});\nfunction textСorrectionInField(refObj, fieldValue) {\n  //Убираем запрещённые символы и обрезаем строку\n  return fieldValue.replace(\"ё\", \"е\").replace(\"Ё\", \"Е\").replace(new RegExp(`[^${refObj.regularExp}]`, \"gi\"), \"\").substring(0, refObj.maxlength - 1);\n}\n\n//# sourceURL=webpack://privateorders/./client/script.js?");

/***/ }),

/***/ "./client/tables.js":
/*!**************************!*\
  !*** ./client/tables.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"reloadTable\": () => (/* binding */ reloadTable)\n/* harmony export */ });\n\nfunction reloadTable(table, data) {\n  if (data.error) {\n    table.innerHTML = `<tr>\n          <th scope=\"row\">${data.error}</th>\n        </tr>`;\n  }\n  //Обновление таблицы с артикулами\n  if (data.length) {\n    table.innerHTML = data.reduce((output, row, index) => {\n      return output += `<tr>\n          <th scope=\"row\">${index + 1}</th>\n          <td class='vendorCode'>${row.vendorCode}</td>\n          <td class='itemName'>${row.itemName}</td>\n          <td class='unit'>${row.unit}</td>\n          <td class='quantity'>${row.quantity}</td>\n        </tr>`;\n    }, \"\");\n  } else {\n    table.innerHTML = `<tr>\n          <th scope=\"row\">Нет подобных артикулов</th>\n        </tr>`;\n  }\n}\n\n//# sourceURL=webpack://privateorders/./client/tables.js?");

/***/ }),

/***/ "./components/items-db_schema.js":
/*!***************************************!*\
  !*** ./components/items-db_schema.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"testFormForInputItem\": () => (/* binding */ testFormForInputItem)\n/* harmony export */ });\n//Объект для проверки значений введённых пользователем - в таблицу 'items'\n\nconst testFormForInputItem = {\n  vendorCode: {\n    required: true,\n    maxlength: 20,\n    containsNumber: false,\n    description: \"артикул изделия\",\n    regularExp: 'а-яё\\\\-+/()#*.,\"\\\\d\\\\w\\\\s'\n  },\n  itemName: {\n    required: true,\n    maxlength: 255,\n    containsNumber: false,\n    description: \"наименование изделия\",\n    regularExp: 'а-яё\\\\-+#№/()%:;*.,\"\\\\d\\\\w\\\\s'\n  },\n  unit: {\n    required: true,\n    maxlength: 15,\n    containsNumber: false,\n    description: \"единицы измерения\",\n    regularExp: \"а-яё.,/-\\\\d\\\\w\\\\s\"\n  },\n  quantity: {\n    required: true,\n    maxlength: 5,\n    containsNumber: true,\n    min: 0.1,\n    max: 5000,\n    description: \"количество единиц в хлысте или упаковке\",\n    regularExp: \".,/d\"\n  },\n  notes: {\n    required: false,\n    maxlength: 200,\n    containsNumber: false,\n    description: \"примечания\",\n    regularExp: 'а-яё\\\\-+#№/()%:;*.,\"\\\\d\\\\w\\\\s'\n  }\n};\n\n//# sourceURL=webpack://privateorders/./components/items-db_schema.js?");

/***/ }),

/***/ "./components/testing-data-from-input.js":
/*!***********************************************!*\
  !*** ./components/testing-data-from-input.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"testDataFromForm\": () => (/* binding */ testDataFromForm)\n/* harmony export */ });\n\n//module.exports =\nfunction testDataFromForm(refObj, jsonData) {\n  //Функция проверки переданных значений.\n  //Принимает объект refObj с параметрами проверки и jsonData с данными\n  //Если всё норм - возвращает объект c данными, нет - объект с массивом ошибок\n\n  const testObj = JSON.parse(jsonData);\n  const errArr = [];\n  for (let key in refObj) {\n    if (refObj[key].required && !testObj[key]) {\n      errArr.push(`Поле \"${refObj[key].description}\" должно содержать значение.`);\n    }\n    if (refObj[key].containsNumber) {\n      if (+testObj[key] < refObj[key].min || +testObj[key] > refObj[key].max) errArr.push(`Значение \"${refObj[key].description}\" должно быть положительным числом в диапазоне от ${refObj[key].min} до ${refObj[key].max}.`);\n    } else if (testObj[key].length > refObj[key].maxlength) {\n      errArr.push(`Значение \"${refObj[key].description}\" должно быть короче ${refObj[key].maxlength} символов.`);\n    }\n  }\n  return errArr.length ? {\n    errors: errArr\n  } : testObj;\n}\n\n//# sourceURL=webpack://privateorders/./components/testing-data-from-input.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./client/script.js");
/******/ 	
/******/ })()
;