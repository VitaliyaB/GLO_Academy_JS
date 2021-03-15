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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar sendForm = function sendForm() {\n  var errorMessage = 'Что-то пошло не так...';\n  var loadMessage = 'Загрузка...';\n  var successMessage = 'Спасибо! Мы скоро с вами свяжемся!';\n  var mainForm = document.getElementById('form1');\n  var footerForm = document.getElementById('form2');\n  var popUpForm = document.getElementById('form3');\n  var statusMessage = document.createElement('div');\n  statusMessage.style.cssText = 'font-size: 2rem; color: white; margin-top: 1em;';\n\n  var postData = function postData(formData) {\n    return fetch('./server.php', {\n      method: 'POST',\n      body: formData\n    });\n  };\n\n  var submitForm = function submitForm(event) {\n    event.preventDefault();\n    var target = event.target;\n    var inputs = target.querySelectorAll('input');\n    var validName = false;\n    var validEmail = false;\n    var validPhone = false;\n    var validMessage = false;\n    inputs.forEach(function (item) {\n      if (item.getAttribute('name') === 'user_name') {\n        console.log('hello');\n      }\n\n      if (item.classList.contains('form-phone')) {\n        var phoneReg = /^(\\+7|8)(\\d{10}|(-+?\\d{3}-+?(\\d{3}-+?\\d{2}-+?\\d{2}|\\d{7})|(\\(+?\\d{3}\\)+?(\\d{3}-+?\\d{2}-+?\\d{2}|\\d{7}))))$/g;\n\n        if (phoneReg.test(item.value)) {\n          validPhone = true;\n        } else {\n          var errorFormMessage = document.createElement('div');\n          errorFormMessage.textContent = 'Введите корректный номер телефона';\n          errorFormMessage.style.cssText = 'font-size: 1.3rem;  color: red;';\n          item.style.border = '2px solid red';\n\n          if (target.classList.contains('main-form')) {\n            errorFormMessage.style.transform = 'translateY(-3rem)';\n          }\n\n          item.after(errorFormMessage);\n        }\n      }\n\n      if (item.classList.contains('form-email')) {\n        var emailReg = /([a-z@\\-_.!~*])+(@)([a-z.-])+((\\.)([a-z]){2,})$/;\n\n        if (emailReg.test(item.value)) {\n          validEmail = true;\n        } else {\n          var _errorFormMessage = document.createElement('div');\n\n          _errorFormMessage.textContent = 'Введите корректный email';\n          _errorFormMessage.style.cssText = 'font-size: 1.3rem;  color: red;';\n          item.style.border = '2px solid red';\n\n          if (target.classList.contains('main-form')) {\n            _errorFormMessage.style.transform = 'translateY(-3rem)';\n          }\n\n          item.after(_errorFormMessage);\n        }\n      }\n\n      if (item.classList.contains('mess')) {\n        if (item.value) {\n          validMessage = true;\n        } else {\n          var _errorFormMessage2 = document.createElement('div');\n\n          _errorFormMessage2.textContent = 'Поле должно быть заполнено';\n          _errorFormMessage2.style.cssText = 'font-size: 1.3rem;  color: red; margin-top: -2rem;';\n          item.style.border = '2px solid red';\n\n          if (target.classList.contains('main-form')) {\n            _errorFormMessage2.style.transform = 'translateY(-3rem)';\n          }\n\n          item.after(_errorFormMessage2);\n        }\n      }\n    });\n\n    if (validPhone && validEmail && validMessage) {\n      event.target.appendChild(statusMessage);\n      statusMessage.textContent = loadMessage;\n      var formData = new FormData(event.target);\n      postData(formData).then(function (response) {\n        if (response.status !== 200) {\n          throw new Error('status network not 200');\n        }\n\n        var inputs = document.querySelectorAll('input');\n        statusMessage.textContent = successMessage;\n        inputs.forEach(function (item) {\n          item.value = '';\n        });\n      })[\"catch\"](function (err) {\n        console.error(err);\n        statusMessage.textContent = errorMessage;\n      });\n    }\n  };\n\n  mainForm.addEventListener('submit', submitForm);\n  footerForm.addEventListener('submit', submitForm);\n  popUpForm.addEventListener('submit', submitForm);\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sendForm);\n\n//# sourceURL=webpack://3dglo/./src/modules/sendForm.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("888d4537536e797ad871")
/******/ })();
/******/ 
/******/ }
);