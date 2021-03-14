/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_3dglo"]("main",{

/***/ "./src/modules/scrollPage.js":
/*!***********************************!*\
  !*** ./src/modules/scrollPage.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar scrollPage = function scrollPage() {\n  var links = document.querySelectorAll('a[href*=\"#\"]');\n\n  var scrollToTarget = function scrollToTarget(event) {\n    event.preventDefault();\n    var target = event.target.closest('a');\n    var linkHref = target.getAttribute('href').slice(1);\n    document.getElementById(linkHref).scrollIntoView({\n      behavior: 'smooth',\n      block: 'start'\n    });\n  };\n\n  links.forEach(function (item) {\n    item.addEventListener('click', scrollToTarget);\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (scrollPage);\n\n//# sourceURL=webpack://3dglo/./src/modules/scrollPage.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("839a573fe617bf66f754")
/******/ })();
/******/ 
/******/ }
);