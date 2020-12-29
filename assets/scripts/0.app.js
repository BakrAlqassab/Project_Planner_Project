(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./src/App/Component.js":
/*!******************************!*\
  !*** ./src/App/Component.js ***!
  \******************************/
/*! exports provided: Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Component\", function() { return Component; });\nclass Component {\r\n  constructor(hostElementId, insertBefore = false) {\r\n    if (hostElementId) {\r\n      this.hostElement = document.getElementById(hostElementId);\r\n    } else {\r\n      this.hostElement = document.body;\r\n    }\r\n    this.insertBefore = insertBefore;\r\n  }\r\n  detach() {\r\n    // Be sure the lement exist to delete\r\n    if (this.element) {\r\n      this.element.remove();\r\n      // this.element.parentChild.removeChild(this.element)\r\n    }\r\n  }\r\n  attach() {\r\n    // document.body.append(this.element);\r\n    this.hostElement.insertAdjacentElement(\r\n      this.insertBefore ? \"afterbegin\" : \"beforeend\",\r\n      this.element\r\n    );\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/App/Component.js?");

/***/ }),

/***/ "./src/App/Tooltip.js":
/*!****************************!*\
  !*** ./src/App/Tooltip.js ***!
  \****************************/
/*! exports provided: Tooltip */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Tooltip\", function() { return Tooltip; });\n/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Component */ \"./src/App/Component.js\");\n\r\n\r\nclass Tooltip extends _Component__WEBPACK_IMPORTED_MODULE_0__[\"Component\"] {\r\n  constructor(closeNotifierFunction, text, hostElementId) {\r\n    // Control the position of the text\r\n    // super(\"active-projects\", true);\r\n    super(hostElementId);\r\n    this.closeNotifier = closeNotifierFunction;\r\n    this.text = text;\r\n    this.closedTooltip = () => {\r\n    this.detach();\r\n    this.closeNotifier();\r\n  };\r\n    this.create();\r\n  }\r\n\r\n  create() {\r\n    const toolTipElement = document.createElement(\"div\");\r\n    toolTipElement.className = \"card\";\r\n    //For easy contents\r\n    // // toolTipElement.textContent = this.text;\r\n    //  toolTipElement.innerHTML = `<h2> More Info </h2>\r\n    // <p> ${this.text}</p> `;\r\n\r\n    // For complecated constents\r\n    const toolTipTemplate = document.getElementById(\"tooltip\");\r\n    const toolTipBody = document.importNode(toolTipTemplate.content, true);\r\n    toolTipBody.querySelector(\"p\").textContent = this.text;\r\n    toolTipElement.append(toolTipBody);\r\n    // toolTipElement.addEventListener('click',this.detach.bind(this))\r\n\r\n    // Cart position / Dimension\r\n    console.log(this.hostElement.getBoundingClientRect());\r\n    const hostElPosLeft = this.hostElement.offsetLeft;\r\n    const hostElPosRight = this.hostElement.offsetRight;\r\n    const hostElPosTop = this.hostElement.offsetTop;\r\n    const hostElPosHeight = this.hostElement.offsetHeight;\r\n    const parentElementScrolling = this.hostElement.parentElement.scrollTop;\r\n\r\n    const x = hostElPosLeft + 20;\r\n    const y = hostElPosTop + hostElPosHeight - parentElementScrolling - 10;\r\n    toolTipElement.style.position = \"absolute\";\r\n    toolTipElement.style.left = x + \"px\";\r\n    toolTipElement.style.top = y + \"px\";\r\n\r\n    toolTipElement.addEventListener(\"click\", this.closedTooltip);\r\n    this.element = toolTipElement;\r\n  }\r\n}\n\n//# sourceURL=webpack:///./src/App/Tooltip.js?");

/***/ })

}]);