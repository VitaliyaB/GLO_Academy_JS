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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar sendForm = function sendForm() {\n  var errorMessage = 'Что-то пошло не так...';\n  var loadMessage = 'Загрузка...';\n  var successMessage = 'Спасибо! Мы скоро с вами свяжемся!';\n  var mainForm = document.getElementById('form1');\n  var footerForm = document.getElementById('form2');\n  var popUpForm = document.getElementById('form3');\n  var statusMessage = document.createElement('div');\n  statusMessage.style.cssText = 'font-size: 2rem; color: white; margin-top: 1em;';\n\n  var postData = function postData(formData) {\n    return fetch('./server.php', {\n      method: 'POST',\n      body: formData\n    });\n  };\n\n  var submitForm = function submitForm(event) {\n    event.preventDefault();\n    var target = event.target;\n    var inputs = target.querySelectorAll('input');\n    var validName = false;\n    var validEmail = false;\n    var validPhone = false;\n    var validMessage = false;\n\n    var errorNotify = function errorNotify(text, item, attr) {\n      var errorFormMessage = document.createElement('div');\n      errorFormMessage.textContent = text;\n\n      if (attr === 'user_message') {\n        errorFormMessage.style.cssText = 'font-size: 1.3rem;  color: red; margin-top: -2rem';\n      } else {\n        errorFormMessage.style.cssText = 'font-size: 1.3rem;  color: red;';\n      }\n\n      item.style.border = '2px solid red';\n\n      if (target.classList.contains('main-form')) {\n        errorFormMessage.style.transform = 'translateY(-3rem)';\n      }\n\n      item.after(errorFormMessage);\n    };\n\n    inputs.forEach(function (item) {\n      var attrName = item.getAttribute('name');\n\n      if (attrName === 'user_name') {\n        var nameReg = /[а-яё\\s]{2,}/gi;\n\n        if (nameReg.test(item.value)) {\n          validName = true;\n        } else {\n          errorNotify('Поле должно содержать не менее 2 символов', item, attrName);\n        }\n      }\n\n      if (attrName === 'user_phone') {\n        var phoneReg = /^(\\+7|8)(\\d{10}|(-+?\\d{3}-+?(\\d{3}-+?\\d{2}-+?\\d{2}|\\d{7})|(\\(+?\\d{3}\\)+?(\\d{3}-+?\\d{2}-+?\\d{2}|\\d{7}))))$/g;\n\n        if (phoneReg.test(item.value)) {\n          validPhone = true;\n        } else {\n          errorNotify('Введите корректный номер телефона', item, attrName);\n        }\n      }\n\n      if (attrName === 'user_email') {\n        var emailReg = /([a-z@\\-_.!~*])+(@)([a-z.-])+((\\.)([a-z]){2,})$/gi;\n\n        if (emailReg.test(item.value)) {\n          validEmail = true;\n        } else {\n          errorNotify('Введите корректный email', item, attrName);\n        }\n      }\n\n      if (attrName === 'user_message') {\n        if (item.value) {\n          validMessage = true;\n        } else {\n          errorNotify('Поле должно быть заполнено', item, attrName);\n        }\n      }\n    });\n\n    if (validPhone && validEmail && validMessage && validName) {\n      event.target.appendChild(statusMessage);\n      statusMessage.textContent = loadMessage;\n      var formData = new FormData(event.target);\n      postData(formData).then(function (response) {\n        if (response.status !== 200) {\n          throw new Error('status network not 200');\n        }\n\n        var inputs = document.querySelectorAll('input');\n        statusMessage.textContent = successMessage;\n        inputs.forEach(function (item) {\n          item.value = '';\n        });\n      })[\"catch\"](function (err) {\n        console.error(err);\n        statusMessage.textContent = errorMessage;\n      });\n    }\n  };\n\n  mainForm.addEventListener('submit', submitForm);\n  footerForm.addEventListener('submit', submitForm);\n  popUpForm.addEventListener('submit', submitForm);\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sendForm);\n\n//# sourceURL=webpack://3dglo/./src/modules/sendForm.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("361919233d7f01a1630c")
/******/ })();
/******/ 
/******/ }
);