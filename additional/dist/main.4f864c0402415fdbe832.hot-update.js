/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_3dglo"]("main",{

/***/ "./src/modules/calc.js":
/*!*****************************!*\
  !*** ./src/modules/calc.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar calc = function calc() {\n  var price = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;\n  var calcBlock = document.querySelector('.calc-block');\n  var calcType = document.querySelector('.calc-type');\n  var calcSquare = document.querySelector('.calc-square');\n  var calcCount = document.querySelector('.calc-count');\n  var calcDay = document.querySelector('.calc-day');\n  var totalValue = document.getElementById('total');\n  var countSumTotal = 0;\n  var step = 1;\n  var animationTime = 2000;\n\n  var debounce = function debounce(func, wait) {\n    var timeout;\n    return function () {\n      var start = function start() {\n        timeout = null;\n        func();\n      };\n\n      clearTimeout(timeout);\n      timeout = setTimeout(start, wait);\n    };\n  };\n\n  var countSum = debounce(function () {\n    var total = 0;\n    var countValue = 1;\n    var dayValue = 1;\n    var typeValue = calcType.options[calcType.selectedIndex].value;\n    var squareValue = +calcSquare.value;\n\n    if (calcCount.value > 1) {\n      countValue += Math.ceil((calcCount.value - 1) / 10);\n    }\n\n    if (calcDay.value && calcDay.value < 5) {\n      dayValue *= 2;\n    } else if (calcDay.value && calcDay.value < 10) {\n      dayValue *= 1.5;\n    }\n\n    if (typeValue && squareValue) {\n      total = price * typeValue * squareValue * countValue * dayValue;\n    }\n\n    if (total < 500) {\n      step = 10;\n    } else if (total > 10000) {\n      step = 1000;\n    } else {\n      step = 100;\n    }\n\n    var time = Math.round(animationTime / (total / step));\n    countSumTotal = total % step;\n\n    var setTotal = function setTotal() {\n      if (total > 0) {\n        countSumTotal += step;\n        totalValue.textContent = countSumTotal;\n\n        if (countSumTotal >= total) {\n          countSumTotal = 0;\n          clearInterval(timerId);\n        }\n      } else {\n        clearInterval(timerId);\n      }\n    };\n\n    var timerId = setInterval(setTotal, time);\n  }, 500);\n  calcBlock.addEventListener('change', function (event) {\n    var target = event.target;\n\n    if (target.matches('select, input')) {\n      countSum();\n    }\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);\n\n//# sourceURL=webpack://3dglo/./src/modules/calc.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("026cd862b18eb1cd4e68")
/******/ })();
/******/ 
/******/ }
);