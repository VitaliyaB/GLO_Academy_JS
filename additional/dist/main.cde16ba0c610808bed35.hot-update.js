/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_3dglo"]("main",{

/***/ "./src/modules/toggleMenu.js":
/*!***********************************!*\
  !*** ./src/modules/toggleMenu.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar toggleMenu = function toggleMenu() {\n  var btnMenu = document.querySelector('.menu');\n  var menu = document.querySelector('menu');\n\n  var handlerMenu = function handlerMenu() {\n    menu.classList.toggle('active-menu');\n  };\n\n  menu.addEventListener('click', function (event) {\n    var target = event.target;\n    console.log('menu.addEventListener ~ target', target);\n\n    if (target.classList.contains('close-btn') || target.matches('menu a')) {\n      handlerMenu();\n    }\n\n    if (target.matches('menu a')) {\n      event.preventDefault();\n      var hrefAttr = target.getAttribute('href');\n      document.getElementById(hrefAttr.slice(1)).scrollIntoView({});\n    }\n  });\n  btnMenu.addEventListener('click', handlerMenu);\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (toggleMenu);\n\n//# sourceURL=webpack://3dglo/./src/modules/toggleMenu.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("4923d7dfe7d5fa09c822")
/******/ })();
/******/ 
/******/ }
);