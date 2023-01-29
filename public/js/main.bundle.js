/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./client/loadingItemFromDb.js":
/*!*************************************!*\
  !*** ./client/loadingItemFromDb.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadingItemFromDb": () => (/* binding */ loadingItemFromDb),
/* harmony export */   "reloadTable": () => (/* binding */ reloadTable)
/* harmony export */ });


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
      console.log('Network request for "' + fetchUrl + column + code + '" image failed with response ' + response.status + ": " + response.statusText);
    }
  });
}
function reloadTable(data, table) {
  //Обновление таблицы с артикулами
  if (data.length) {
    table.innerHTML = data.reduce((output, row, index) => {
      return output += `<tr>
          <th scope="row">${index + 1}</th>
          <td class='vendorCode'>${row.vendorCode}</td>
          <td class='itemName'>${row.itemName}</td>
          <td class='unit'>${row.unit}</td>
          <td class='quantity'>${row.quantity}</td>
        </tr>`;
    }, "");
  } else {
    table.innerHTML = `<tr>
          <th scope="row">Нет подобных артикулов</th>
        </tr>`;
  }
}

/***/ }),

/***/ "./components/items-db_schema.js":
/*!***************************************!*\
  !*** ./components/items-db_schema.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "testFormForInputItem": () => (/* binding */ testFormForInputItem)
/* harmony export */ });
//Объект для проверки значений введённых пользователем - в таблицу 'items'

const testFormForInputItem = {
  vendorCode: {
    required: true,
    maxlength: 20,
    containsNumber: false,
    description: "артикул изделия",
    regularExp: 'а-яё\\-+/()#*.,"\\d\\w\\s'
  },
  itemName: {
    required: true,
    maxlength: 255,
    containsNumber: false,
    description: "наименование изделия",
    regularExp: 'а-яё\\-+#№/()%:;*.,"\\d\\w\\s'
  },
  unit: {
    required: true,
    maxlength: 15,
    containsNumber: false,
    description: "единицы измерения",
    regularExp: "а-яё.,/-\\d\\w\\s"
  },
  quantity: {
    required: true,
    maxlength: 5,
    containsNumber: true,
    min: 0.1,
    max: 5000,
    description: "количество единиц в хлысте или упаковке",
    regularExp: ".,/d"
  },
  notes: {
    required: false,
    maxlength: 200,
    containsNumber: false,
    description: "примечания",
    regularExp: 'а-яё\\-+#№/()%:;*.,"\\d\\w\\s'
  }
};

/***/ }),

/***/ "./components/testing-data-from-input.js":
/*!***********************************************!*\
  !*** ./components/testing-data-from-input.js ***!
  \***********************************************/
/***/ ((module) => {

module.exports = function testDataFromForm(refObj, jsonData) {
  //Функция проверки переданных значений.
  //Принимает объект refObj с параметрами проверки и jsonData с данными
  //Если всё норм - возвращает объект c данными, нет - объект с массивом ошибок

  const testObj = JSON.parse(jsonData);
  const errArr = [];
  for (let key in refObj) {
    if (refObj[key].required && !testObj[key]) {
      errArr.push(`Поле "${refObj[key].description}" должно содержать значение.`);
    }
    if (refObj[key].containsNumber) {
      if (+testObj[key] < refObj[key].min || +testObj[key] > refObj[key].max) errArr.push(`Значение "${refObj[key].description}" должно быть положительным числом в диапазоне от ${refObj[key].min} до ${refObj[key].max}.`);
    } else if (testObj[key].length > refObj[key].maxlength) {
      errArr.push(`Значение "${refObj[key].description}" должно быть короче ${refObj[key].maxlength} символов.`);
    }
  }
  return errArr.length ? {
    errors: errArr
  } : testObj;
};

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**************************!*\
  !*** ./client/script.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_items_db_schema_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/items-db_schema.js */ "./components/items-db_schema.js");
/* harmony import */ var _components_testing_data_from_input_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/testing-data-from-input.js */ "./components/testing-data-from-input.js");
/* harmony import */ var _components_testing_data_from_input_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_components_testing_data_from_input_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _loadingItemFromDb_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./loadingItemFromDb.js */ "./client/loadingItemFromDb.js");
 //объект для проверки ввода
 //функция для проверки ввода
 //загрузка данных с БД

const buttonAddVendorCode = document.querySelector("#buttonAddVendorCode");
const tableVendorsCodes = document.querySelector("#tableVendorsCodes");
const inputVendorCode = document.querySelector("#inputVendorCode");
const inputItemName = document.querySelector("#inputItemName");
const inputUnit = document.querySelector("#inputUnit");
const inputQuantity = document.querySelector("#inputQuantity");
const inputNotes = document.querySelector("#inputNotes");
const submitToDB = document.querySelector("#submitToDB");
//регулярка для быстрого фильтра по артикулам
const regExpForFilter = new RegExp("[^а-яё\\d\\w]", "gi");

//открыть окно добавления артикула
buttonAddVendorCode.addEventListener("click", () => {
  (0,_loadingItemFromDb_js__WEBPACK_IMPORTED_MODULE_2__.loadingItemFromDb)("filter", "%25");
});
submitToDB.addEventListener("click", e => {
  e.preventDefault();
  const formValue = JSON.stringify(Object.fromEntries(new FormData(window.formForInputItem)));
  console.log((0,_components_testing_data_from_input_js__WEBPACK_IMPORTED_MODULE_1__.testDataFromForm)(_components_items_db_schema_js__WEBPACK_IMPORTED_MODULE_0__.testFormForInputItem, formValue));
  fetch(fetchUrl + "addItem", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: sendData
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
      console.log("Network request for /addItem" + '" image failed with response ' + response.status + ": " + response.statusText);
    }
  });
});

//ввод в поле "артикул"
inputVendorCode.addEventListener("input", () => {
  //автокоррекция вводимых данных
  console.log(_components_items_db_schema_js__WEBPACK_IMPORTED_MODULE_0__.testFormForInputItem);
  inputVendorCode.value = textСorrectionInField(_components_items_db_schema_js__WEBPACK_IMPORTED_MODULE_0__.testFormForInputItem.vendorCode, inputVendorCode.value);
  autoFilterForInputs(inputVendorCode.value, inputItemName.value);
});

//ввод в поле "наименование"
inputItemName.addEventListener("input", () => {
  inputItemName.value = textСorrectionInField(_components_items_db_schema_js__WEBPACK_IMPORTED_MODULE_0__.testFormForInputItem.itemName, inputItemName.value);
  autoFilterForInputs(inputVendorCode.value, inputItemName.value);
});
function autoFilterForInputs(field1, field2) {
  const reqFilter = (field1 || field2).replace(regExpForFilter, "%25").toLowerCase() || "%25";
  //если введены данные в два поля - фильтр не используем
  if (!(field1 && field2)) {
    (0,_loadingItemFromDb_js__WEBPACK_IMPORTED_MODULE_2__.loadingItemFromDb)("filter",
    //оставляем в запросе только буквы и цифры, знаки и пробелы заменяем на маску  "любые символы - %"
    (field1 || field2).replace(regExpForFilter, "%25").toLowerCase() || "%25");
  }
}
//ввод количества
inputQuantity.addEventListener("input", () => {
  inputItemName.value = textСorrectionInField(_components_items_db_schema_js__WEBPACK_IMPORTED_MODULE_0__.testFormForInputItem.quantity, inputItemName.value);
  if (+inputQuantity.value.length > 6) {
    console.log(inputQuantity.value);
    inputQuantity.value = inputQuantity.value.substring(0, 6);
  }
});
//ввод примечаний
inputNotes.addEventListener("input", () => {
  inputNotes.value = textСorrectionInField(_components_items_db_schema_js__WEBPACK_IMPORTED_MODULE_0__.testFormForInputItem.notes, inputNotes.value);
});

//Перенос данных в поля input кликами по соответствующим полям в таблице
tableVendorsCodes.addEventListener("click", e => {
  if (e.target.className) window["input" + e.target.className[0].toUpperCase() + e.target.className.slice(1)].value = e.target.textContent;
});
function textСorrectionInField(refObj, fieldValue) {
  //Убираем запрещённые символы и обрезаем строку
  return fieldValue.replace("ё", "е").replace("Ё", "Е").replace(new RegExp(`[^${refObj.regularExp}]`, "gi"), "").substring(0, refObj.maxlength - 1);
}
})();

/******/ })()
;