/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_3dglo"]("main",{

/***/ "./src/modules/togglePopUp.js":
/*!************************************!*\
  !*** ./src/modules/togglePopUp.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar togglePopUp = function togglePopUp() {\n  var popUp = document.querySelector('.popup');\n  var popUpBtn = document.querySelectorAll('.popup-btn');\n  var popUpContent = document.querySelector('.popup-content');\n  var popUpForm = document.getElementById('form3');\n  var inputs = popUpForm.querySelectorAll('input');\n  var intervalId;\n\n  var showPopUp = function showPopUp() {\n    popUp.style.display = 'block';\n\n    if (window.innerWidth >= 768) {\n      var endPositionPopUp = popUpContent.offsetTop;\n      var startPositionPopUp = -popUpContent.offsetHeight;\n      popUpContent.style.top = startPositionPopUp + 'px';\n      intervalId = setInterval(function () {\n        if (endPositionPopUp !== startPositionPopUp) {\n          if (startPositionPopUp < 0) {\n            startPositionPopUp -= startPositionPopUp;\n            popUpContent.style.top = startPositionPopUp + 'px';\n          } else {\n            if (endPositionPopUp % 2 === 0) {\n              startPositionPopUp += 2;\n            } else {\n              startPositionPopUp++;\n            }\n\n            popUpContent.style.top = startPositionPopUp + 'px';\n          }\n        } else {\n          clearInterval(intervalId);\n        }\n      }, 5);\n    }\n  };\n\n  popUpBtn.forEach(function (elem) {\n    elem.addEventListener('click', showPopUp);\n  });\n  popUp.addEventListener('click', function (event) {\n    var target = event.target;\n\n    if (target.classList.contains('popup-close')) {\n      popUp.style.display = 'none';\n      inputs.forEach(function (item) {\n        item.value = '';\n      });\n    } else {\n      target = target.closest('.popup-content');\n\n      if (!target) {\n        popUp.style.display = 'none';\n        inputs.forEach(function (item) {\n          item.value = '';\n        });\n      }\n    }\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (togglePopUp);\n\n//# sourceURL=webpack://3dglo/./src/modules/togglePopUp.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("f4b715ac44d716a7192c")
/******/ })();
/******/ 
/******/ }
);