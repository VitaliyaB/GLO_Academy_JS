/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_3dglo"]("main",{

/***/ "./src/modules/sendForm.js":
/*!*********************************!*\
  !*** ./src/modules/sendForm.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar sendForm = function sendForm() {\n  var errorMessage = 'Что-то пошло не так...';\n  var loadMessage = 'Загрузка...';\n  var successMessage = 'Спасибо! Мы скоро с вами свяжемся!';\n  var mainForm = document.getElementById('form1');\n  var footerForm = document.getElementById('form2');\n  var popUpForm = document.getElementById('form3');\n  var statusMessage = document.createElement('div');\n  statusMessage.style.cssText = 'font-size: 2rem; color: white; margin-top: 1em;';\n\n  var postData = function postData(body) {\n    return fetch('./server.php', {\n      method: 'POST',\n      mode: 'cors',\n      headers: {\n        'Content-Type': 'application/json'\n      },\n      body: body\n    });\n  };\n\n  var submitForm = function submitForm(event) {\n    event.preventDefault();\n    event.target.appendChild(statusMessage);\n    statusMessage.textContent = loadMessage;\n    var formData = new FormData(event.target);\n    postData(formData).then(function (response) {\n      if (response.status !== 200) {\n        throw new Error('status network not 200');\n      }\n\n      var inputs = document.querySelectorAll('input');\n      statusMessage.textContent = successMessage;\n      inputs.forEach(function (item) {\n        item.value = '';\n      });\n    })[\"catch\"](function (err) {\n      console.error(err);\n      statusMessage.textContent = errorMessage;\n    });\n  };\n\n  mainForm.addEventListener('submit', submitForm);\n  footerForm.addEventListener('submit', submitForm);\n  popUpForm.addEventListener('submit', submitForm);\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sendForm);\n\n//# sourceURL=webpack://3dglo/./src/modules/sendForm.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("79f4bf461ca83660ef46")
/******/ })();
/******/ 
/******/ }
);